const express = require("express")
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const User = require("../database/Users");
const { connect } = require("http2");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})






//Basic account making
router.post("/register",
  body("password")
  //Funny regex, basically must be atleast 8 characters, have 1 capital, number and symbol
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#\$%\^&\*\(\)\-_\+={}\[\]\|\;:"<>,\.\/\?\\]).{8,}$/, "i"),
 (req, res , next) => {

  console.log(req.body);
  console.log(req.body.password);

    console.log("post");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    User.findOne({username: req.body.username}, (err,user) => {
        if(err) throw err;

        if(user){

            return res.status(403).json({username: "username exist"});

        } else {

            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(req.body.password, salt, (err, hash) => {

                    User.create(
                        {
                            username: req.body.username,
                            password: hash
                        },
                        (err, ok) => {
                            if (err) throw err;
                            return res.redirect("/login");
                        }
                    );
                })

            })
        }

    });

})

//Login authentication and generating the token
router.post('/login',
upload.none(),
  (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) =>{
    
    if(err) throw err;
    if(!user) {
      return res.status(403).json({message: "User not found"});
    } else {

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {

            console.log("ismatch");
          
          const jwtPayload = {
            id: user._id,
            username: user.username
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET || "secret",
            {
              expiresIn: 3000
            },
            (err, token) => {
                console.log(token);
              res.json({token});
            }
          );
        }
      })
    }

    })

});


module.exports = router;
