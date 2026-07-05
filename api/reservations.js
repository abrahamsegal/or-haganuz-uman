const { json, readBody, requireAdmin, reservationFromBody, supabase, validateReservation } = require("./_lib");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (!requireAdmin(req, res)) return;
      const rows = await supabase("reservations?select=*&order=checkin.asc");
      return json(res, 200, { reservations: rows });
    }

    if (req.method === "POST") {
      const isAdminRequest = req.headers["x-admin-write"] === "true";
      if (isAdminRequest && !requireAdmin(req, res)) return;
      const body = await readBody(req);
      const reservation = reservationFromBody(body, {
        source: isAdminRequest ? body.source || "Manual" : "Web",
        status: isAdminRequest ? body.status || "Pendiente" : "Pendiente",
      });
      const error = validateReservation(reservation, isAdminRequest);
      if (error) return json(res, 400, { error });
      const [created] = await supabase("reservations", {
        method: "POST",
        body: JSON.stringify(reservation),
      });
      return json(res, 201, { reservation: created });
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
