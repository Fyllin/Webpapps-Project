const express = require("express");
const mongoose = require("mongoose");
const Post = require("../database/Posts");
const router = express.Router();
const fs = require("fs");
const { connect } = require("http2");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})




router.post("/post",
    upload.none(),
    (req, res, next) => {
    console.log("jou4");
    console.log(req.body);
    Post.findOne({text : req.body.text}, (err, post) => {
    
            new Post({

                user: req.body.user,
                text: req.body.text,
                commentCount: 0

            }).save((err) => {

                if(err) return next(err);
                return res.send(req.body);

            });

    });
})

router.get("/posts", (req, res, next) => {
    Post.find({}, (err, poems) => {
        
        if(err) return next(err);
        if(poems) {
            return res.json(poems);
        } else {
            return res.status(404).send("Not found");
        }
    })
})


router.post("/comment", (req, res, next) => {
    Comment.findOne({text : req.body.text}, (err, poem) => {
    
            new comment({

                user: req.body.user,
                text: req.body.text,
                parentPost: req.body.post
                
            }).save((err) => {

                if(err) return next(err);
                return res.send(req.body);

            });

    });
}) 

module.exports = router;
