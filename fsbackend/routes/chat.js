var express = require('express');
var router = express.Router();
const Chat = require('../model/chat');
var Users = require("../model/users");
var db = require("../model/database");
const { Op } = require("sequelize");


/* GET messages listing */
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
  } else if(req.query.queryType === "clearUnseen" ) {

    console.log("clearUnseen",req.query);
    try {
      console.log("clearUnseen",req.query.fromid,req.query.toid);
      let result = await Chat.update({ seen: true }, { where: { fromid: req.query.fromid , toid:req.query.toid }});
      console.log(result);
      res.send(result);
    } catch(e) {
      res.sendStatus(400);
    }

  } else {
    res.sendStatus(400);
  }

});

/* POST new message */
router.post('/', async function(req, res, next) {
  console.log("New Message",req.body);
  if(req.query.queryType === "newMessage" && req.body.fromid != undefined && req.body.toid != undefined){
    try{
      const newMessage = await Chat.create({fromid: req.body.fromid, toid: req.body.toid, message: req.body.message ,seen:false});
      res.send(newMessage);
    } catch(e) {
      res.sendStatus(400);
      console.log("Something went wrong!",e)
    }
  } else {
    res.sendStatus(400);
  }
}
)

module.exports = router;