const PRICING = {
  lodging: {
    single: 75,
    double: 89,
    triple: 120,
    quad: 140,
  },
  adultBreakfast: 25,
  adultDinner: 35,
  adultShabbat: 160,
  childParentRoom: 15,
  childBreakfast: 12,
  childDinner: 18,
  childShabbat: 70,
};

const PLAN_LABELS = {
  single: "1 persona por cuarto",
  double: "2 personas por cuarto",
  triple: "3 personas por cuarto",
  quad: "4 personas por cuarto",
};

function money(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US")}`;
}

function toIsoDate(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (!match) return "";
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3].length === 2 ? `20${match[3]}` : match[3]);
  if (!day || !month || !year) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateOnly(value) {
  const iso = toIsoDate(value);
  if (!iso) return null;
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function nightsBetween(checkin, checkout) {
  const start = dateOnly(checkin);
  const end = dateOnly(checkout);
  if (!start || !end || end <= start) return 0;
  return Math.round((end - start) / 86400000);
}

function numberValue(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePlan(value) {
  const text = String(value || "").toLowerCase();
  if (!text.trim()) return "";
  if (["single", "individual", "1"].includes(text) || /1\s*(persona|adult|guest)/.test(text)) return "single";
  if (["double", "doble", "2"].includes(text) || /2\s*(personas|adults|guests)/.test(text)) return "double";
  if (["triple", "3"].includes(text) || /3\s*(personas|adults|guests)/.test(text)) return "triple";
  if (["quad", "cuadruple", "4"].includes(text) || /4\s*(personas|adults|guests)/.test(text)) return "quad";
  return "double";
}

function boolValue(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  const text = String(value).trim().toLowerCase();
  return ["1", "true", "si", "yes", "on", "incluye", "incluir"].includes(text);
}

function findLineValue(message, labels) {
  const text = String(message || "");
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`${escaped}\\s*[:=-]\\s*([^\\n\\r]+)`, "i"));
    if (match) return match[1].trim();
  }
  return "";
}

function findNumber(message, labels) {
  const value = findLineValue(message, labels);
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function parseQuoteMessage(message = "") {
  const text = String(message || "");
  const lower = text.toLowerCase();
  const checkin = toIsoDate(findLineValue(text, ["Entrada", "Check-in", "Checkin"]));
  const checkout = toIsoDate(findLineValue(text, ["Salida", "Check-out", "Checkout"]));
  const rooms = findNumber(text, ["Cuartos", "Rooms"]) || undefined;
  const adults = findNumber(text, ["Adultos", "Adults", "Guests", "Huespedes"]) || undefined;
  const children = findNumber(text, ["Ninos", "Ni\u00f1os", "Children"]) || 0;
  const planText = findLineValue(text, ["Tarifa", "Ocupacion", "Ocupaci\u00f3n", "Room type", "Habitacion", "Habitaci\u00f3n"]);

  return {
    checkin,
    checkout,
    rooms,
    adults,
    children,
    plan: planText ? normalizePlan(planText) : undefined,
    adultBreakfast: /desayuno adultos|adult breakfast/.test(lower),
    adultDinner: /cena adultos|adult dinner/.test(lower),
    adultShabbat: /shabat adultos|shabbat adults|paquete shabat adultos/.test(lower),
    childParentRoom: children > 0,
    childBreakfast: /desayuno (ninos|ni\u00f1os)|child breakfast/.test(lower),
    childDinner: /cena (ninos|ni\u00f1os)|child dinner/.test(lower),
    childShabbat: /shabat (ninos|ni\u00f1os)|shabbat children|paquete shabat (ninos|ni\u00f1os)/.test(lower),
  };
}

function normalizeQuoteInput(input = {}) {
  const adults = Math.max(1, numberValue(input.adults ?? input.guests, 0));
  const children = Math.max(0, numberValue(input.children, 0));
  return {
    checkin: toIsoDate(input.checkin),
    checkout: toIsoDate(input.checkout),
    rooms: Math.min(24, Math.max(1, numberValue(input.rooms ?? input.roomCount, 1))),
    adults,
    children,
    plan: normalizePlan(input.plan ?? input.roomType ?? input.occupancy) || "double",
    adultBreakfast: boolValue(input.adultBreakfast),
    adultDinner: boolValue(input.adultDinner),
    adultShabbat: boolValue(input.adultShabbat),
    childParentRoom: boolValue(input.childParentRoom, children > 0),
    childBreakfast: boolValue(input.childBreakfast),
    childDinner: boolValue(input.childDinner),
    childShabbat: boolValue(input.childShabbat),
  };
}

function missingQuoteFields(input) {
  const missing = [];
  const checkin = toIsoDate(input.checkin);
  const checkout = toIsoDate(input.checkout);
  const hasAdults = input.adults !== undefined || input.guests !== undefined;
  const hasRooms = input.rooms !== undefined || input.roomCount !== undefined;
  const hasPlan = Boolean(normalizePlan(input.plan ?? input.roomType ?? input.occupancy));

  if (!checkin) missing.push("fecha de entrada");
  if (!checkout) missing.push("fecha de salida");
  if (!hasAdults) missing.push("adultos");
  if (!hasRooms) missing.push("cuartos");
  if (!hasPlan) missing.push("ocupacion por cuarto");
  if (checkin && checkout && !nightsBetween(checkin, checkout)) {
    missing.push("fechas validas");
  }
  return missing;
}

function calculateQuote(input = {}) {
  const data = normalizeQuoteInput(input);
  const nights = nightsBetween(data.checkin, data.checkout);
  const lines = [];
  let total = 0;
  const roomRate = PRICING.lodging[data.plan] || PRICING.lodging.double;

  const lodging = nights * data.rooms * roomRate;
  if (lodging) {
    total += lodging;
    lines.push(`Hospedaje: ${data.rooms} cuarto(s) x ${nights} noche(s) x ${money(roomRate)} = ${money(lodging)}`);
  }

  if (data.children && data.childParentRoom && nights) {
    const amount = data.children * nights * PRICING.childParentRoom;
    total += amount;
    lines.push(`Ninos en cuarto de padres: ${data.children} x ${nights} x ${money(PRICING.childParentRoom)} = ${money(amount)}`);
  }

  if (data.adultBreakfast && nights) {
    const amount = data.adults * nights * PRICING.adultBreakfast;
    total += amount;
    lines.push(`Desayuno adultos: ${data.adults} x ${nights} x ${money(PRICING.adultBreakfast)} = ${money(amount)}`);
  }

  if (data.adultDinner && nights) {
    const amount = data.adults * nights * PRICING.adultDinner;
    total += amount;
    lines.push(`Cena adultos: ${data.adults} x ${nights} x ${money(PRICING.adultDinner)} = ${money(amount)}`);
  }

  if (data.adultShabbat) {
    const amount = data.adults * PRICING.adultShabbat;
    total += amount;
    lines.push(`Paquete Shabat adultos: ${data.adults} x ${money(PRICING.adultShabbat)} = ${money(amount)}`);
  }

  if (data.children && data.childBreakfast && nights) {
    const amount = data.children * nights * PRICING.childBreakfast;
    total += amount;
    lines.push(`Desayuno ninos: ${data.children} x ${nights} x ${money(PRICING.childBreakfast)} = ${money(amount)}`);
  }

  if (data.children && data.childDinner && nights) {
    const amount = data.children * nights * PRICING.childDinner;
    total += amount;
    lines.push(`Cena ninos: ${data.children} x ${nights} x ${money(PRICING.childDinner)} = ${money(amount)}`);
  }

  if (data.children && data.childShabbat) {
    const amount = data.children * PRICING.childShabbat;
    total += amount;
    lines.push(`Paquete Shabat ninos: ${data.children} x ${money(PRICING.childShabbat)} = ${money(amount)}`);
  }

  return {
    ...data,
    nights,
    roomRate,
    planLabel: PLAN_LABELS[data.plan] || data.plan,
    total,
    lines,
  };
}

function buildBotReply(input = {}) {
  const quote = calculateQuote(input);
  const missing = missingQuoteFields(input);

  if (missing.length) {
    return {
      quote,
      missing,
      reply: [
        "Para cotizar Hotel Or Haganuz Uman necesito:",
        `- ${missing.join(", ")}`,
        "",
        "Puedes responder asi:",
        "Entrada: 2026-07-20",
        "Salida: 2026-07-23",
        "Adultos: 2",
        "Ninos: 0",
        "Cuartos: 1",
        "Ocupacion: 2 personas por cuarto",
        "",
        "Opcional: desayuno, cena o paquete Shabat.",
      ].join("\n"),
    };
  }

  return {
    quote,
    missing: [],
    reply: [
      "Cotizacion estimada - Hotel Or Haganuz Uman",
      `Entrada: ${quote.checkin}`,
      `Salida: ${quote.checkout}`,
      `Noches: ${quote.nights}`,
      `Cuartos: ${quote.rooms}`,
      `Adultos: ${quote.adults}`,
      `Ninos: ${quote.children}`,
      `Tarifa: ${quote.planLabel} (${money(quote.roomRate)} por cuarto/noche)`,
      "",
      "Detalle:",
      ...quote.lines.map((line) => `- ${line}`),
      "",
      `Total estimado: ${money(quote.total)}`,
      "",
      "Todos los cuartos tienen el mismo precio base; cambia solo por ocupacion.",
      "Precio sujeto a disponibilidad y confirmacion escrita del hotel.",
    ].join("\n"),
  };
}

module.exports = {
  PRICING,
  buildBotReply,
  calculateQuote,
  money,
  normalizeQuoteInput,
  parseQuoteMessage,
};
