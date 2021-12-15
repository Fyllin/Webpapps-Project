var express = require('express');
var router = express.Router();
const Post = require("../database/Posts");

router.get('/', function(req, res, next) {

  res.render("index");

});

router.get('/login', function(req, res, next) {

  res.render('login');

});

router.get('/register', function(req, res, next) {
  
  res.render('register');
  
});

router.get('/post/:id', function(req, res, next) {

  Post.findById( req.params.id, (err, post) => {
  
    res.render('post', {user: post.user, text: post.text, commentCount: post.commentCount, id:req.params.id});

  });


  
  
  
});




module.exports = router;
