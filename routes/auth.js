var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../config');
var bcrypt = require('bcrypt');
var db = require('../db');



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
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
        if(!err && result!==null && bcrypt.compareSync(password, result.password)){
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
            message: "user does not exist"
          });
        }
    }
    db.findUser({email}, handler);

  }
});

router.get('/verifytoken', (req, res, next) =>{
  let token = req.headers['authorization'];
  console.log(token);
  jwt.verify(token, config.JWT_KEY, (err, decode)=>{
    if(!err){
      res.json({
        succeess: true,
        message: "token is valid"
      })
    }else{
      res.status(401).json({
        succeess: false,
        error: err  
      })
    }
  })
})
  

module.exports = router;