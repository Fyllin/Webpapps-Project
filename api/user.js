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







router.post("/register",
  body("password")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#\$%\^&\*\(\)\-_\+={}\[\]\|\;:"<>,\.\/\?\\]).{8,}$/, "i"),
 (req, res , next) => {

  console.log(req.body);
  console.log(req.body.password);

    console.log("post");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({email: req.body.username}, (err,user) => {



        if(err) throw err;

        if(user){

            return res.status(403).json({email: "email exist"});

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

router.post('/login',
upload.none(),
  (req, res, next) => {
    console.log(req.body);
    User.findOne({email: req.body.username}, (err, user) =>{

    
    if(err) throw err;
    if(!user) {
      return res.status(403).json({message: "Login failed"});
    } else {

      console.log(req.body.password);
      console.log(user.password);


      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {

            console.log("ismatch");
          
          const jwtPayload = {
            id: user._id,
            username: user.username
          }
          console.log("payload:" + jwtPayload);
          console.log("secret:" + process.env.SECRET);
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
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
