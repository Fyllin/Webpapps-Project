
var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");


//Here lies basic authentication that are used in example when loading a page or trying to comment

//For the main page
router.get('/index', function(req, res, next) {

  
    const authHeader = req.headers["authorization"];

  
    console.log(authHeader);
    let token;
    if(authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        token = null;
    }

    //The function returns different renders based on if the authentication works

    if(token == null) return res.render("index");;
    console.log("Token found");
    console.log(token);
    jwt.verify(token, process.env.SECRET, (err, user) => {

        if(err) return res.render("index");

        console.log("verified");

        return res.render("indexLoggedIn");

    });

});

//For a page of a single post
router.get('/post', function(req, res, next) {

    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    let token;
    if(authHeader) {

        token = authHeader.split(" ")[1];

    } else {

        token = null;

    }

    //The function returns different renders based on if the authentication works

    if(token == null) return res.render("post");
    console.log("Token found");
    console.log(token);
    jwt.verify(token, process.env.SECRET, (err, user) => {

        if(err) return res.render("post");
        console.log("verified");
        return res.render("postLoggedIn");

    });

});

//Identifying the user when making a comment

router.get('/comment', function(req, res, next) {

  
    const authHeader = req.headers["authorization"];

  
    console.log(authHeader);
    let token;
    if(authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        token = null;
    }
    if(token == null) return;
    console.log("Token found");
    console.log(token);
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return;
        console.log("verified");
        return user.user;
    });

});



module.exports = router;
