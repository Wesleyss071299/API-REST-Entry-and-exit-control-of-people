var express = require('express');
var router = express.Router();
var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//POST for register user
router.post('/register', function(req, res, next) {
  var {username, email, password} = req.body.userData;

  const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);


  var dataToInsert ={
    username,
    email,
    password: hash
  }

  
  const handler = (err, result) =>   {
    if(!err){
      res.json({
        success: true,
        message: "User registered",
        data: result
        
      });
    }else{
      res.json({
        success: false,
        message: "User not registered",
        error: err
      });
    }
  }
  
  db.register(dataToInsert, handler);
});






module.exports = router;
