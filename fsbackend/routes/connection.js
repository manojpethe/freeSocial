var express = require('express');
var router = express.Router();
var Users = require("../model/users");
var Connection = require("../model/connection");
var db = require("../model/database");
const { Op } = require("sequelize");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.queryType === "getConnections"){
    console.log("getConnections");
    res.send({ message: "OK"});
  } else {
    res.sendStatus(401).send({ message: "Bad Request"});
  }

});

router.post('/', async function(req, res, next) {
  if(req.query.queryType === "requestConnection"){
    console.log("Requesting new Connection",req.body);    
    try{
      const newRequest = await Connection.create({userid: req.body.fromId, friendid: req.body.toId, status:1});
      res.send(newRequest);
    } catch(e) {
      console.log("Something went wrong!",e)
    }
  }

  if(req.query.queryType === "connectionStatus"){
    console.log("Requesting Connection Status",req.body);    
    try{
      // const result = await Connection.findAll({where: {userid: req.body.fromId, friendid:req.body.toId}})
      const whereClause = {
        where: {
          // [Op.and]: [{userid: req.body.fromId},{userid: req.body.toId}],
          // [Op.and]: [{friendid:req.body.toId},{userid: req.body.fromId}]
          userid: [req.body.fromId,req.body.toId],
          friendid: [req.body.fromId,req.body.toId]
        }
      };
      
      const result = await Connection.findAll(whereClause);

      res.send(result);
    } catch(e) {
      console.log("Something went wrong!",e)
    }
  }


  



//   if(req.query.queryType === "registerUser"){
//     console.log("User registration request",req.body);
//     try{
//     const newUser = await Users.create({ "email":req.body.email, "active": true , "registered": Date().toString()})
//     res.send(newUser);
//     }catch{
//       res.status(503).end();
//     }
//   } else {
//     res.status(400).end();
//   }
    // try{
    //   const response = await Users.findAll({
    //     where: {
    //       email: req.query.getUser
    //     }
    //   });
    //     res.send({ count: response.length ,user:response});
    //   } catch(e){
    //     res.send(e);
    //   }
  
});

module.exports = router;
