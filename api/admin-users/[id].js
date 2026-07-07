const { deleteStoredAdminUser, json, readBody, requireOwner, updateStoredAdminUser } = require("../_lib");

module.exports = async function handler(req, res) {
  const session = requireOwner(req, res);
  if (!session) return;

  const id = req.query.id;
  if (!id || id === "owner") return json(res, 400, { error: "El dueno principal no se edita desde la pagina." });

  try {
    if (req.method === "PATCH") {
      const body = await readBody(req);
      const updated = await updateStoredAdminUser(id, body);
      return json(res, 200, { user: updated });
    }

    if (req.method === "DELETE") {
      await deleteStoredAdminUser(id);
      return json(res, 200, { ok: true });
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
