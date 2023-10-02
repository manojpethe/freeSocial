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
      const response = await db.query(`SELECT * FROM Users where profile not like '%"gender":"${req.query.gender}"%' `);
        res.send(response[0]).status(200).end();
      } catch(e){
        res.send(e).status(400).end();
      }
  }
});

module.exports = router;