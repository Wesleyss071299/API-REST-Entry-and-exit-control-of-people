var express = require('express');
var router = express.Router();
var db = require('../db');


router.post('/register', function(req, res, next) {
  var {firstName, lastName, email, password, isDeleted} = req.body.userData;

  var dataToInsert ={
    firstName,
    lastName,
    email,
    password,
    isDeleted
  }


  const handler = (err, result) =>   {
    console.log(vaca);
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
