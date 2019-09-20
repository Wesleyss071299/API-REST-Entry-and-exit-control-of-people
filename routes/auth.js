var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../config');
var bcrypt = require('bcrypt');
var db = require('../db');



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



router.post('/login', (req, res, next) => {
  console.log(req.body.userData)
  const {email, password} = req.body.userData;

  if(email === undefined || password === undefined){
    res.status(401).json({
      succeess: false,
      message: "Email or password invalid"
    });
  }else{

    const handler = (err, result) =>{
        if(!err && bcrypt.compareSync(password, result.password)){
          let tokenData = {
            name: result.name,
            email: result.email
          }
  
          let generatedtoken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '1m'});
          res.json({
            succeess:true,
            token: generatedtoken
          });

        }else{
          res.status(401).json({
            succeess: false,
            message: err
          });
        }
    }
    db.findUser({email}, handler);

  }
});
  

module.exports = router;