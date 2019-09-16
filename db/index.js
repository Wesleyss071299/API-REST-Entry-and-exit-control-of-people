var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');   

var db;

/*
Database connection
*/

MongoClient.connect(config.MONG_URL, { useNewUrlParser: true }, function (err, database){
    assert.equal(null, err);
    db = database.db("login_demo");
    if(!err){
        console.log('Connection established to MongoDB.');
    } else {
        console.log('Not possible to established the connection to MongoDB.')
    }


});



module.exports = {
    //Insert data
    register: (data, handler) => {
        db.collection('users').insertOne(data, (err, result) => {
            handler(err, result);
        })
    }
 }