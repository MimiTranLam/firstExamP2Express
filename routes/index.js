var express = require('express');
var router = express.Router();

const companiesApi = require("./companies.api");
router.use("/companies", companiesApi);

module.exports = router;

