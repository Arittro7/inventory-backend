const { User } = require("../models");
const crypto = require("crypto");

async function generateApiToken(req, res, next) {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    await User.update({ apiToken: token }, { where: { id: req.user.id } });

    res.json({ apiToken: token });
  } catch (err) {
    next(err);
  }
}

module.exports = { generateApiToken };
