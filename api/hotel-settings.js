const { getHotelSettings, json, readBody, requireFullAccess, saveHotelSettings } = require("./_lib");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const settings = await getHotelSettings();
      return json(res, 200, { settings });
    }

    if (req.method === "PATCH" || req.method === "PUT" || req.method === "POST") {
      const session = requireFullAccess(req, res);
      if (!session) return;
      const body = await readBody(req);
      const settings = await saveHotelSettings(body.settings || body);
      return json(res, 200, { settings });
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
