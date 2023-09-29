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
        res.send({ count: response.length ,user:response});
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

module.exports = router;
