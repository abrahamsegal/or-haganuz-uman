const { json, requireAdmin } = require("./_lib");

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  return json(res, 200, { ok: true });
};
