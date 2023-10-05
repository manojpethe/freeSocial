var express = require('express');
var router = express.Router();
var Users = require("../model/users");
var Connection = require("../model/connection");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.queryType === "getConnections"){
    console.log("getConnections");
    res.send({ message: "OK"});
//     console.log("getUser:",req.query.getUser);
//     try{
//       const response = await Users.findAll({
//         where: {
//           email: req.query.getUser
//         }
//       });
//       if(response.length){
//         res.send({ count: response.length ,user:response[0]});
//       } else{
//         res.send({ count: 0 ,user:response});
//       }
//       } catch(e){
//         res.send(e);
//       }
//   } else {
//     try{
//     const response = await Users.findAll();
//       res.send(response);
//     } catch(e){
//       res.send(e);
//     }
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
    // try{
    //   let result = await Users.update({ profile: req.body }, { where: { email: req.query.email }});
    //   console.log("result:--------->",result);
    //   res.send(req.body).status(200).end();
    // } catch(e){
    //   res.send(e);
    // }
    // res.send(req.body).status(200).end();
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
