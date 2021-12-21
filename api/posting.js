const express = require("express");
const mongoose = require("mongoose");
const Post = require("../database/Posts");
const Comment = require("../database/Comments");
const router = express.Router();
const fs = require("fs");
const { connect } = require("http2");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
const jwt = require("jsonwebtoken");
const hljs = require("highlight.js")




//The function for posting a form to MongoDB
router.post("/post",
    upload.none(),
    (req, res, next) => {


    //Authenticating if the user is certainly logged in when making a post. Also to check who the user is
    const authHeader = req.body.authToken;
    console.log(authHeader);
    let token;
    if(authHeader) {
        token = authHeader;
    } else {
        token = null;
    }
    if(token == null) return;
    console.log("Token found");
    jwt.verify(token, process.env.SECRET, (err, user) => {

        //Changing the text to the highlighted html form
        let code = hljs.highlightAuto(req.body.text);

        Post.findOne({text : req.body.text}, (err, post) => {
        
                new Post({

                    title: req.body.title,
                    user: user.username,
                    text: code.value,
                    commentCount: 0

                }).save((err) => {

                    if(err) return next(err);
                    return res.send(req.body);

                });

        });
    });
})

//Simple function to fetch the posts from Mongo
router.get("/posts", (req, res, next) => {
    Post.find({}, (err, posts) => {
        
        if(err) return next(err);
        if(posts) {
            return res.json(posts);
        } else {
            return res.status(404).send("Not found");
        }
    })
})

router.get("/post/:id", (req, res, next) => {
    Post.findOne({_id : req.params.id}, (err, post) => {
        
        if(err) return next(err);
        if(post) {
            return res.json(post);
        } else {
            return res.status(404).send("Not found");
        }
    })
})

//Getting the comments for a single post
router.get("/comments/:id", (req, res, next) => {
    Comment.find({parentPost : req.params.id}, (err, comments) => {
        
        if(err) return next(err);
        if(comments) {
            return res.json(comments);
        } else {
            return res.json("");
        }
    })
})

//When making a comment
//Same kind of authentication as in making a post
router.post("/comment", upload.none(), (req, res, next) => {


    const authHeader = req.body.authToken;

  
  console.log(authHeader);
  let token;
  if(authHeader) {
      token = authHeader;
  } else {
      token = null;
  }

  if(token == null) return;
  console.log("Token found");
  console.log(token);

  jwt.verify(token, process.env.SECRET, (err, user) => {
      if(err) return;
      console.log("verified");
      console.log(user);
      new Comment({

        user: user.username,
        text: req.body.text,
        parentPost: req.body.postId
        
        }).save((err) => {

            if(err) return next(err);
            Post.findByIdAndUpdate(req.body.postId, { $inc: { commentCount: 1 }}, function(err, data){
                console.log(err);
             });
            return res.send(req.body);

        });
  });
    
}) 

module.exports = router;
