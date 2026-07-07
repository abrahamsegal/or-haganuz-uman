const { createStoredAdminUser, json, listStoredAdminUsers, ownerUser, publicUser, readBody, requireOwner } = require("./_lib");

module.exports = async function handler(req, res) {
  const session = requireOwner(req, res);
  if (!session) return;

  try {
    if (req.method === "GET") {
      const users = [publicUser(ownerUser()), ...(await listStoredAdminUsers()).map(publicUser)];
      return json(res, 200, { users });
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const created = await createStoredAdminUser(body);
      return json(res, 201, { user: created });
    }

    return json(res, 405, { error: "Metodo no permitido" });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message });
  }
};
