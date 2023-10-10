var express = require('express');
var router = express.Router();
const Chat = require('../model/chat');
var Users = require("../model/users");
var db = require("../model/database");
const { Op } = require("sequelize");


/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.queryType === "getMessages" ){
    // if( !Number.isInteger(req.query.fromid) && !Number.isInteger(req.query.toid)){
    //     res.sendStatus(400);
    //     return;
    // }

    console.log("getMessages!",req.query);
    const whereClause = {
        where: {
          // [Op.and]: [{userid: req.body.fromId},{userid: req.body.toId}],
          // [Op.and]: [{friendid:req.body.toId},{userid: req.body.fromId}]
          fromid: [req.query.fromid,req.query.toid],
          toid: [req.query.fromid,req.query.toid]
        }
      };
    try{
        const result = await Chat.findAll(whereClause);
        res.send(result);
    } catch {
      (e)=>{
        console.error(e);
      }
    }
  } else {
    res.sendStatus(400);
  }

});

router.post('/', async function(req, res, next) {
  if(req.query.queryType === "newMessage"){
    console.log("New Message",req.body);
    try{
      const newMessage = await Chat.create({fromid: req.body.fromid, toid: req.body.toid, message: req.body.message ,seen:false});
      res.send(newMessage);
    } catch(e) {
      console.log("Something went wrong!",e)
    }
  } else {
    res.sendStatus(400);
  }
}
)


//   if(req.query.queryType === "approveRequest"){
//     console.log("approve Connection request",req.body);    
//     try{
//       // const newRequest = await Connection.create({userid: req.body.fromId, friendid: req.body.toId, status:1});
//       // res.send(newRequest);
//       let result = await Connection.update({ status: 2 }, { where: [{ id:req.body.requestid },{ status:req.body.status }]});
//       res.send(result);
//     } catch(e) {
//       console.log("Something went wrong!",e)
//     }
//   }

//   if(req.query.queryType === "connectionStatus"){
//     console.log("Requesting Connection Status",req.body);    
//     try{
//       // const result = await Connection.findAll({where: {userid: req.body.fromId, friendid:req.body.toId}})
//       const whereClause = {
//         where: {
//           // [Op.and]: [{userid: req.body.fromId},{userid: req.body.toId}],
//           // [Op.and]: [{friendid:req.body.toId},{userid: req.body.fromId}]
//           userid: [req.body.fromId,req.body.toId],
//           friendid: [req.body.fromId,req.body.toId]
//         }
//       };
      
//       const result = await Connection.findAll(whereClause);

//       res.send(result);
//     } catch(e) {
//       console.log("Something went wrong!",e)
//     }
//   }
  
// }

// );

module.exports = router;