const { clearSessionCookie, json } = require("./_lib");

module.exports = async function handler(req, res) {
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
};
