var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render("indexInit");
  
});

router.get('/login', function(req, res, next) {

  res.render('login');

});

router.get('/register', function(req, res, next) {
  
  res.render('register');
  
});

router.get('/post/:id', function(req, res, next) {
  
    res.render('postInit', {pid : req.params.id});
  
});

module.exports = router;
