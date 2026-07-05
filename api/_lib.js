const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COOKIE_NAME = "oh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const LOCAL_DB_PATH = path.join(__dirname, "..", ".local-data", "reservations.json");

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

function signSession() {
  const payload = base64Url(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }));
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
  return data.exp > Math.floor(Date.now() / 1000);
}

function setSessionCookie(res) {
  const cookieParts = [
    `${COOKIE_NAME}=${encodeURIComponent(signSession())}`,
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
    if (verifySession(token)) return true;
  } catch {
    // Fall through to 401.
  }
  json(res, 401, { error: "No autorizado" });
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
    notes: String(body.notes || "").trim(),
    terms_accepted: Boolean(body.termsAccepted || body.terms_accepted),
  };
}

function validateReservation(input, admin = false) {
  if (!input.guest_name) return "Falta el nombre del huesped.";
  if (!input.guest_phone && !input.guest_email) return "Falta telefono o email.";
  if (!input.checkin || !input.checkout) return "Faltan fechas.";
  if (input.checkout <= input.checkin) return "La salida debe ser despues de la entrada.";
  if (!admin && !input.terms_accepted) return "Debes aceptar los terminos.";
  return "";
}

module.exports = {
  clearSessionCookie,
  json,
  readBody,
  requireAdmin,
  reservationFromBody,
  setSessionCookie,
  supabase,
  validateReservation,
};
