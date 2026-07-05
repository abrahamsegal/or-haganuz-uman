const { json, readBody, setSessionCookie } = require("./_lib");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Metodo no permitido" });

  try {
    const body = await readBody(req);
    if (body.username !== process.env.ADMIN_USER || body.password !== process.env.ADMIN_PASSWORD) {
      return json(res, 401, { error: "Usuario o clave incorrectos" });
    }
    setSessionCookie(res);
    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 500, { error: error.message });
  }
};
