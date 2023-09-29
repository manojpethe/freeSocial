var express = require('express');
var router = express.Router();
var Users = require("../model/users");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.getUser){
    console.log("getUser:",req.query.getUser);
    try{
      const response = await Users.findAll({
        where: {
          email: req.query.getUser
        }
      });
      if(response.length){
        res.send({ count: response.length ,user:response[0]});
      } else{
        res.send({ count: 0 ,user:response});
      }
      } catch(e){
        res.send(e);
      }
  } else {
    try{
    const response = await Users.findAll();
      res.send(response);
    } catch(e){
      res.send(e);
    }
  }
});

router.post('/', async function(req, res, next) {
    console.log("User registration request",req.body);
    if(req.body.email){
      try{
      const newUser = await Users.create({ "email":req.body.email, "active": true , "registered": Date().toString()})
      res.send(newUser);
      }catch{
        res.status(503).end();
      }
    } else {
      res.status(400).end();
    }
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
