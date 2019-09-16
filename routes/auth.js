var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../config');



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/login', (req, res, next) => {
  const {email, password} = req.body.userData;

  if(email === undefined || password === undefined){
    res.status(401).json({
      succeess: false,
      message: "Email or password invalid"
    });
  }else{
    let tokenData = {
      id:101
    }

    let generatedtoken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '1m'});
    res.json({
      succeess:true,
      token: generatedtoken
    })
  }
});
  

module.exports = router;