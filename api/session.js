const { json, requireAdmin } = require("./_lib");

module.exports = async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;
  return json(res, 200, { ok: true, user: session });
};
