const { json, readBody } = require("./_lib");
const { buildBotReply, parseQuoteMessage, PRICING } = require("./quote-engine");

function cleanPayload(body = {}) {
  const fromMessage = parseQuoteMessage(body.message || body.text || "");
  return {
    ...fromMessage,
    ...body,
    rooms: body.rooms ?? body.roomCount ?? fromMessage.rooms,
    adults: body.adults ?? body.guests ?? fromMessage.adults,
    children: body.children ?? fromMessage.children,
    plan: body.plan ?? body.roomType ?? body.occupancy ?? fromMessage.plan,
  };
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return json(res, 200, {
        pricing: PRICING,
        example: {
          message: "Entrada: 2026-07-20\nSalida: 2026-07-23\nAdultos: 2\nNinos: 1\nCuartos: 1\nOcupacion: 2 personas por cuarto\nDesayuno adultos",
        },
      });
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const result = buildBotReply(cleanPayload(body));
      return json(res, 200, result);
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
