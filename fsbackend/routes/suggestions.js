var express = require('express');
var router = express.Router();
var Users = require("../model/users");
var db = require("../model/database");
const { Op } = require("sequelize");

/* GET users listing. */
router.get('/', async function(req, res, next) {
    // console.log(JSON.parse(req.cookies.userInfo).email);
  if(req.query.gender){
    console.log("Gender",req.query.gender);
    try{
      const response = await db.query(`SELECT * FROM Users where profile like '%${req.query.gender}%' `);
        res.send(response);
      } catch(e){
        res.send(e);
      }
  }
});

module.exports = router;