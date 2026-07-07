const { findStoredAdminUser, json, ownerUser, readBody, setSessionCookie, verifyPassword } = require("./_lib");

function clientUser(user) {
  return {
    username: user.username,
    name: user.name || user.username,
    role: user.role,
    roleLabel: user.role === "owner" ? "Dueno" : user.role === "full" ? "Acceso completo" : "Acceso limitado",
    canManageUsers: user.role === "owner",
    canDeleteReservations: user.role === "owner" || user.role === "full",
    canExport: user.role === "owner" || user.role === "full",
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Metodo no permitido" });

  try {
    const body = await readBody(req);
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const owner = ownerUser();

    const ownerPassword = String(process.env.OWNER_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "").trim();
    const ownerUsername = String(owner.username || "").trim().toLowerCase();
    if (username === ownerUsername && password === ownerPassword) {
      setSessionCookie(res, owner);
      return json(res, 200, { ok: true, user: clientUser(owner) });
    }

    const user = await findStoredAdminUser(username);
    if (!user || user.active === false || !verifyPassword(password, user.password_hash)) {
      return json(res, 401, { error: "Usuario o clave incorrectos" });
    }

    setSessionCookie(res, user);
    return json(res, 200, { ok: true, user: clientUser(user) });
  } catch (error) {
    return json(res, 500, { error: error.message });
  }
};
