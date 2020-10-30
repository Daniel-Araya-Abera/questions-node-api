var express = require('express');
var router = express.Router();
// const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');
const {ensureAuthenticated } = require("../config/auth");

/* GET welcome page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/home', ensureAuthenticated,function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("Home page on /home hi users -> " + req.user);
});

module.exports = router;
