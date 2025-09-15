const express = require("express");
const { generateApiToken } = require("../controllers/user.controller");
const router = express.Router();

router.post("/generate-token", generateApiToken);

module.exports = router;
