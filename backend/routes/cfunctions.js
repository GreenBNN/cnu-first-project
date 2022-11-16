var express = require("express");
var router = express.Router();
var cfunctions = require("../cfunctions.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(cfunctions);
});

module.exports = router;
