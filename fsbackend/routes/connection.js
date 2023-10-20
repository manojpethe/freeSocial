var express = require('express');
var router = express.Router();
var Users = require("../model/users");
var Connection = require("../model/connection");
var db = require("../model/database");
const { Op } = require("sequelize");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.queryType === "getConnections" && req.query.id !== undefined ){
    console.log("getConnections id:",req.query.id);
    const sqlFindConnections1 = 
    `select id, json_extract(profile,'$.fullName' ) as fullName from Users where id in
    (
    select friendid as id from Connections where userid = ${req.query.id} and status = 2
    union all
    select userid as id from Connections where friendid = ${req.query.id} and status = 2
    )`;

    const sqlFindConnections =`
    select 
    U.id, 
    json_extract(U.profile,'$.fullName' ) as fullName,
    (
      select 
      count(*) 
      from Chats C 
      where C.fromid = U.id 
      and C.seen = false
    ) as unseen
    from Users U
    where U.id in
    (
    select friendid as id from Connections where userid = ${req.query.id} and status = 2
    union all
    select userid as id from Connections where friendid = ${req.query.id} and status = 2
    )`;

    try{
      const result = await db.query(sqlFindConnections);
      // console.log(result[0]);
      res.send(result[0]);
    } catch {
      (e)=>{
        console.error(e);
      }
    }
  } else if(req.query.queryType === "getRequests" && req.query.id !== undefined){
    console.log("id:",req.query.id);
    const sqlGetRequestsOld = 
    `
    select 
    id, 
    json_extract(profile,'$.fullName' ) as fullName,
    (1) as status
    from Users where id in
    (
      select userid as id
      from Connections 
      where friendid = ${req.query.id} 
      and status = 1
    )
    `;

    const sqlGetRequests = `
    select conn.userid as id,
    conn.id as requestid,
    json_extract(u.profile,'$.fullName' ) as fullName,
    conn.status
    from Connections conn, Users u
    where conn.friendid = ${req.query.id} 
    and conn.status != 2
    and conn.userid = u.id
    `

    try{
    const result = await db.query(sqlGetRequests);

    res.send(result[0]);
    } catch{
      res.sendStatus(503);
    }
    
  } else {
    res.sendStatus(400);
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


  if(req.query.queryType === "approveRequest"){
    console.log("approve Connection request",req.body);    
    try{
      // const newRequest = await Connection.create({userid: req.body.fromId, friendid: req.body.toId, status:1});
      // res.send(newRequest);
      let result = await Connection.update({ status: 2 }, { where: [{ id:req.body.requestid },{ status:req.body.status }]});
      res.send(result);
    } catch(e) {
      console.log("Something went wrong!",e)
    }
  }

  if(req.query.queryType === "rejectRequest"){
    console.log("approve Connection request",req.body);    
    try{
      // const newRequest = await Connection.create({userid: req.body.fromId, friendid: req.body.toId, status:1});
      // res.send(newRequest);
      let result = await Connection.update({ status: 3 }, { where: [{ id:req.body.requestid },{ status:req.body.status }]});
      res.send(result);
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
