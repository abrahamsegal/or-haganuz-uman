const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COOKIE_NAME = "oh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const LOCAL_DB_PATH = path.join(__dirname, "..", ".local-data", "reservations.json");
const LOCAL_USERS_PATH = path.join(__dirname, "..", ".local-data", "admin-users.json");
const LOCAL_SETTINGS_PATH = path.join(__dirname, "..", ".local-data", "hotel-settings.json");
const PASSWORD_ITERATIONS = 120000;

const ROLE_LABELS = {
  owner: "Dueno",
  full: "Acceso completo",
  limited: "Acceso limitado",
};

const DEFAULT_HOTEL_SETTINGS = {
  rooms: [
    {
      id: "standard-room",
      name: "Cuarto estandar",
      capacity: 4,
      count: 24,
      price: "1 persona $75 / 2 personas $89 / 3 personas $120 / 4 personas $140 por noche",
      active: true,
      description: "24 cuartos iguales. El precio cambia por ocupacion del cuarto.",
    },
  ],
  meals: [
    {
      id: "kosher-breakfast",
      name: "Desayuno kosher",
      type: "Desayuno",
      price: "Adulto $25 / niño $12",
      active: true,
      description: "Desayuno kosher sujeto a disponibilidad y coordinacion previa.",
    },
    {
      id: "shabbat-meals",
      name: "Comidas de Shabat",
      type: "Shabat",
      price: "Adulto $160 / niño $70",
      active: true,
      description: "Paquete de comidas de Shabat bajo reserva.",
    },
    {
      id: "kosher-dinner",
      name: "Cena kosher",
      type: "Cena",
      price: "Adulto $35 / niño $18",
      active: true,
      description: "Cena kosher bajo reserva.",
    },
  ],
  services: [
    {
      id: "mikve",
      name: "Mikve",
      category: "Servicio",
      price: "",
      active: true,
      description: "Mikve dentro del hotel.",
    },
    {
      id: "near-tziyun",
      name: "Cerca del Tziyun",
      category: "Ubicacion",
      price: "",
      active: true,
      description: "Ubicacion en Bilansky 2, cerca del Tziyun.",
    },
  ],
};

function json(res, statusCode, payload, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(payload));
}

function getEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function parseCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function signSession(user) {
  const payload = base64Url(JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    username: user.username,
    name: user.name || user.username,
    role: user.role,
  }));
  const signature = crypto
    .createHmac("sha256", getEnv("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function verifySession(token) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = crypto
    .createHmac("sha256", getEnv("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (data.exp <= Math.floor(Date.now() / 1000)) return false;
  return {
    username: data.username,
    name: data.name,
    role: data.role,
    roleLabel: ROLE_LABELS[data.role] || data.role,
    canManageUsers: data.role === "owner",
    canDeleteReservations: data.role === "owner" || data.role === "full",
    canExport: data.role === "owner" || data.role === "full",
  };
}

function setSessionCookie(res, user) {
  const cookieParts = [
    `${COOKIE_NAME}=${encodeURIComponent(signSession(user))}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (process.env.NODE_ENV === "production") cookieParts.push("Secure");
  const cookie = cookieParts.join("; ");
  res.setHeader("Set-Cookie", cookie);
}

function clearSessionCookie(res) {
  const cookie = [`${COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Strict", "Max-Age=0"];
  if (process.env.NODE_ENV === "production") cookie.push("Secure");
  res.setHeader("Set-Cookie", cookie.join("; "));
}

function requireAdmin(req, res) {
  try {
    const token = parseCookies(req)[COOKIE_NAME];
    const session = verifySession(token);
    if (session) return session;
  } catch {
    // Fall through to 401.
  }
  json(res, 401, { error: "No autorizado" });
  return false;
}

function requireOwner(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return false;
  if (session.role === "owner") return session;
  json(res, 403, { error: "Solo el dueno principal puede hacer esta accion." });
  return false;
}

function requireFullAccess(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return false;
  if (session.role === "owner" || session.role === "full") return session;
  json(res, 403, { error: "Tu usuario no tiene permiso para esta accion." });
  return false;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

async function supabase(path, options = {}) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      throw new Error("Supabase no esta configurado en produccion.");
    }
    return localReservations(path, options);
  }

  const response = await fetch(`${getEnv("SUPABASE_URL")}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: getEnv("SUPABASE_SERVICE_ROLE_KEY"),
      Authorization: `Bearer ${getEnv("SUPABASE_SERVICE_ROLE_KEY")}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.error || "Error de base de datos";
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }
  return data;
}

function ownerUser() {
  return {
    id: "owner",
    username: process.env.OWNER_ADMIN_USER || process.env.ADMIN_USER,
    name: process.env.OWNER_ADMIN_NAME || "Dueno principal",
    role: "owner",
    active: true,
    immutable: true,
  };
}

function verifyPassword(password, passwordHash) {
  if (!password || !passwordHash) return false;
  const [scheme, iterationText, salt, storedHash] = String(passwordHash).split("$");
  if (scheme !== "pbkdf2" || !iterationText || !salt || !storedHash) return false;
  const iterations = Number(iterationText);
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = crypto.pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, 32, "sha256").toString("base64url");
  return `pbkdf2$${PASSWORD_ITERATIONS}$${salt}$${hash}`;
}

function publicUser(row) {
  return {
    id: row.id,
    username: row.username,
    name: row.name || row.username,
    role: row.role,
    roleLabel: ROLE_LABELS[row.role] || row.role,
    active: row.active !== false,
    immutable: row.immutable === true || row.id === "owner",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function readLocalUsers() {
  if (!fs.existsSync(path.dirname(LOCAL_USERS_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_USERS_PATH), { recursive: true });
  }
  if (!fs.existsSync(LOCAL_USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(LOCAL_USERS_PATH, "utf8"));
}

function writeLocalUsers(rows) {
  if (!fs.existsSync(path.dirname(LOCAL_USERS_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_USERS_PATH), { recursive: true });
  }
  fs.writeFileSync(LOCAL_USERS_PATH, JSON.stringify(rows, null, 2));
}

function cloneDefaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULT_HOTEL_SETTINGS));
}

function readLocalSettings() {
  if (!fs.existsSync(path.dirname(LOCAL_SETTINGS_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_SETTINGS_PATH), { recursive: true });
  }
  if (!fs.existsSync(LOCAL_SETTINGS_PATH)) return cloneDefaultSettings();
  return JSON.parse(fs.readFileSync(LOCAL_SETTINGS_PATH, "utf8"));
}

function writeLocalSettings(settings) {
  if (!fs.existsSync(path.dirname(LOCAL_SETTINGS_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_SETTINGS_PATH), { recursive: true });
  }
  fs.writeFileSync(LOCAL_SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

function cleanId(value, prefix) {
  const raw = String(value || "").trim();
  if (raw) return raw.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80);
  return `${prefix}-${crypto.randomUUID()}`;
}

function cleanCatalogText(value) {
  return String(value || "").trim().slice(0, 600);
}

function cleanCatalogImage(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("data:image/")) return raw.slice(0, 900000);
  if (/^https?:\/\//i.test(raw) || raw.startsWith("/assets/") || raw.startsWith("assets/")) return raw.slice(0, 1200);
  return "";
}

function moneyValue(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, number) : null;
}

function normalizeRoom(item = {}) {
  return {
    id: cleanId(item.id, "room"),
    name: cleanCatalogText(item.name) || "Nueva habitacion",
    capacity: Math.max(1, Number(item.capacity || 1)),
    count: Math.max(0, Number(item.count || 0)),
    price: cleanCatalogText(item.price),
    imageUrl: cleanCatalogImage(item.imageUrl || item.image_url),
    active: item.active !== false,
    description: cleanCatalogText(item.description),
  };
}

function normalizeMeal(item = {}) {
  return {
    id: cleanId(item.id, "meal"),
    name: cleanCatalogText(item.name) || "Nueva comida",
    type: cleanCatalogText(item.type) || "Comida",
    price: cleanCatalogText(item.price),
    active: item.active !== false,
    description: cleanCatalogText(item.description),
  };
}

function normalizeService(item = {}) {
  return {
    id: cleanId(item.id, "service"),
    name: cleanCatalogText(item.name) || "Nuevo servicio",
    category: cleanCatalogText(item.category) || "Servicio",
    price: cleanCatalogText(item.price),
    active: item.active !== false,
    description: cleanCatalogText(item.description),
  };
}

function normalizeHotelSettings(input = {}) {
  const source = input.settings || input || {};
  const defaults = cloneDefaultSettings();
  const rooms = Array.isArray(source.rooms) ? source.rooms : defaults.rooms;
  const meals = Array.isArray(source.meals) ? source.meals : defaults.meals;
  const services = Array.isArray(source.services) ? source.services : defaults.services;
  return {
    rooms: rooms.map(normalizeRoom),
    meals: meals.map(normalizeMeal),
    services: services.map(normalizeService),
  };
}

async function getHotelSettings() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      throw new Error("Supabase no esta configurado en produccion.");
    }
    return normalizeHotelSettings(readLocalSettings());
  }

  const rows = await supabase("hotel_settings?key=eq.catalog&select=value&limit=1");
  if (!rows.length) return cloneDefaultSettings();
  return normalizeHotelSettings(rows[0].value);
}

async function saveHotelSettings(input) {
  const settings = normalizeHotelSettings(input);

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      throw new Error("Supabase no esta configurado en produccion.");
    }
    writeLocalSettings(settings);
    return settings;
  }

  const [saved] = await supabase("hotel_settings?on_conflict=key", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ key: "catalog", value: settings }),
  });
  return normalizeHotelSettings(saved?.value || settings);
}

async function listStoredAdminUsers() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      throw new Error("Supabase no esta configurado en produccion.");
    }
    return readLocalUsers();
  }
  return supabase("admin_users?select=*&order=created_at.asc");
}

async function findStoredAdminUser(username) {
  const cleanUsername = String(username || "").trim().toLowerCase();
  if (!cleanUsername) return null;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return readLocalUsers().find((user) => user.username.toLowerCase() === cleanUsername) || null;
  }
  const rows = await supabase(`admin_users?username=eq.${encodeURIComponent(cleanUsername)}&limit=1`);
  return rows[0] || null;
}

async function createStoredAdminUser(input) {
  const now = new Date().toISOString();
  const row = {
    username: String(input.username || "").trim().toLowerCase(),
    name: String(input.name || input.username || "").trim(),
    role: input.role === "full" ? "full" : "limited",
    active: input.active !== false,
    password_hash: hashPassword(String(input.password || "")),
    created_at: now,
    updated_at: now,
  };

  if (!row.username || !input.password) {
    const error = new Error("Falta usuario o clave.");
    error.statusCode = 400;
    throw error;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const rows = readLocalUsers();
    if (rows.some((user) => user.username.toLowerCase() === row.username)) {
      const error = new Error("Ese usuario ya existe.");
      error.statusCode = 409;
      throw error;
    }
    row.id = crypto.randomUUID();
    rows.push(row);
    writeLocalUsers(rows);
    return publicUser(row);
  }

  const [created] = await supabase("admin_users", {
    method: "POST",
    body: JSON.stringify(row),
  });
  return publicUser(created);
}

async function updateStoredAdminUser(id, input) {
  const patch = {
    name: String(input.name || "").trim(),
    role: input.role === "full" ? "full" : "limited",
    active: input.active !== false,
    updated_at: new Date().toISOString(),
  };
  if (input.password) patch.password_hash = hashPassword(String(input.password));

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const rows = readLocalUsers();
    const index = rows.findIndex((user) => user.id === id);
    if (index < 0) {
      const error = new Error("Usuario no encontrado.");
      error.statusCode = 404;
      throw error;
    }
    rows[index] = { ...rows[index], ...patch };
    writeLocalUsers(rows);
    return publicUser(rows[index]);
  }

  const [updated] = await supabase(`admin_users?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return publicUser(updated);
}

async function deleteStoredAdminUser(id) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const rows = readLocalUsers();
    writeLocalUsers(rows.filter((user) => user.id !== id));
    return true;
  }
  await supabase(`admin_users?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
  return true;
}

function readLocalReservations() {
  if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
}

function writeLocalReservations(rows) {
  if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
  }
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(rows, null, 2));
}

function normalizeLocalRow(row) {
  const now = new Date().toISOString();
  return {
    id: row.id || crypto.randomUUID(),
    guest_name: row.guest_name,
    guest_phone: row.guest_phone || "",
    guest_email: row.guest_email || "",
    checkin: row.checkin,
    checkout: row.checkout,
    guests: Number(row.guests || 1),
    room_type: row.room_type || "Por definir",
    source: row.source || "Web",
    status: row.status || "Pendiente",
    currency: row.currency || "USD",
    total_amount: moneyValue(row.total_amount),
    deposit_amount: moneyValue(row.deposit_amount),
    payment_status: row.payment_status || "Sin pago",
    notes: row.notes || "",
    terms_accepted: Boolean(row.terms_accepted),
    created_at: row.created_at || now,
    updated_at: now,
  };
}

function localReservations(requestPath, options) {
  const method = options.method || "GET";
  const rows = readLocalReservations();
  const idMatch = requestPath.match(/id=eq\.([^&]+)/);
  const id = idMatch ? decodeURIComponent(idMatch[1]) : "";

  if (method === "GET") {
    return rows.sort((a, b) => String(a.checkin).localeCompare(String(b.checkin)));
  }

  if (method === "POST") {
    const row = normalizeLocalRow(JSON.parse(options.body || "{}"));
    rows.push(row);
    writeLocalReservations(rows);
    return [row];
  }

  if (method === "PATCH") {
    const index = rows.findIndex((row) => row.id === id);
    if (index < 0) return [];
    rows[index] = normalizeLocalRow({ ...rows[index], ...JSON.parse(options.body || "{}"), id });
    writeLocalReservations(rows);
    return [rows[index]];
  }

  if (method === "DELETE") {
    writeLocalReservations(rows.filter((row) => row.id !== id));
    return [];
  }

  return [];
}

function reservationFromBody(body, defaults = {}) {
  return {
    guest_name: String(body.guestName || body.guest_name || "").trim(),
    guest_phone: String(body.guestPhone || body.guest_phone || "").trim(),
    guest_email: String(body.guestEmail || body.guest_email || "").trim(),
    checkin: String(body.checkin || "").trim(),
    checkout: String(body.checkout || "").trim(),
    guests: Number(body.guests || 1),
    room_type: String(body.roomType || body.room_type || "Por definir").trim(),
    source: String(body.source || defaults.source || "Web").trim(),
    status: String(body.status || defaults.status || "Pendiente").trim(),
    currency: String(body.currency || defaults.currency || "USD").trim().toUpperCase(),
    total_amount: moneyValue(body.totalAmount ?? body.total_amount),
    deposit_amount: moneyValue(body.depositAmount ?? body.deposit_amount),
    payment_status: String(body.paymentStatus || body.payment_status || defaults.paymentStatus || "Sin pago").trim(),
    notes: String(body.notes || "").trim(),
    terms_accepted: Boolean(body.termsAccepted || body.terms_accepted),
  };
}

function validateReservation(input, admin = false) {
  if (!input.guest_name) return "Falta el nombre del huesped.";
  if (!input.guest_phone && !input.guest_email) return "Falta telefono o email.";
  if (!input.checkin || !input.checkout) return "Faltan fechas.";
  if (input.checkout <= input.checkin) return "La salida debe ser despues de la entrada.";
  if (input.total_amount !== null && input.deposit_amount !== null && input.deposit_amount > input.total_amount) {
    return "El anticipo no puede ser mayor que el costo total.";
  }
  if (!admin && !input.terms_accepted) return "Debes aceptar los terminos.";
  return "";
}

module.exports = {
  clearSessionCookie,
  createStoredAdminUser,
  deleteStoredAdminUser,
  findStoredAdminUser,
  getHotelSettings,
  hashPassword,
  json,
  listStoredAdminUsers,
  ownerUser,
  publicUser,
  readBody,
  requireAdmin,
  requireFullAccess,
  requireOwner,
  reservationFromBody,
  saveHotelSettings,
  setSessionCookie,
  supabase,
  updateStoredAdminUser,
  validateReservation,
  verifyPassword,
};
