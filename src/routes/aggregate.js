const express = require("express");
const { getAggregatedResults } = require("../controllers/aggregate.controller");
const router = express.Router();

router.get("/", getAggregatedResults);

module.exports = router;
