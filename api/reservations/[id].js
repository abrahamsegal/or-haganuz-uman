const { json, readBody, requireAdmin, reservationFromBody, supabase, validateReservation } = require("../_lib");

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const id = req.query.id;
  if (!id) return json(res, 400, { error: "Falta ID" });

  try {
    if (req.method === "PATCH") {
      const body = await readBody(req);
      const reservation = reservationFromBody(body, { source: body.source, status: body.status });
      const error = validateReservation(reservation, true);
      if (error) return json(res, 400, { error });
      const [updated] = await supabase(`reservations?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(reservation),
      });
      return json(res, 200, { reservation: updated });
    }

    if (req.method === "DELETE") {
      await supabase(`reservations?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      return json(res, 200, { ok: true });
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
