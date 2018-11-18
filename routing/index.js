var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log(req.method + ' | Time: ' + new Date().toString());
  next();
});

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/../index.html');
});

module.exports = router;
