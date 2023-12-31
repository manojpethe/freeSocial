var express = require('express');
var router = express.Router();
var Users = require("../model/users");

const emptyProfile = {
    fullName: "",
    gender:"",
    religion:"",
    motherTongue:"",
    height:"",
    annualIncome:"",
    location:"",
    caste:"",
    managedBy:"",
    maritalStatus: "",
    birthDate: "01/01/1990",
    aboutMe:"",
    family:"",
    education:"",
    career:""
  };

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.query.queryType === 'getUser' && ( req.query.id !== undefined || req.query.email !== undefined )){
    console.log("getUser:",req.query.id,req.query.email);
    let whereClause = {};
    if(req.query.id){
      whereClause = { where: { id: req.query.id } };
    } else if (req.query.email){
      whereClause = { where: { email: req.query.email } };
    }

    try{
      const response = await Users.findAll(whereClause);
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

  if(req.query.queryType === "updateProfile"){
    console.log("User profile update",req.body);
    try{
      let result = await Users.update({ profile: req.body }, { where: { email: req.query.email }});
      console.log("result:--------->",result);
      res.send(req.body).status(200).end();
    } catch(e){
      res.send(e);
    }
    // res.send(req.body).status(200).end();
  }


  if(req.query.queryType === "registerUser"){
    console.log("User registration request",req.body);
    try{
    const newUser = await Users.create({ "email":req.body.email, "profile": req.body.profile , album: '["blank.jpg"]', "active": true , "registered": Date().toString()})
    res.send(newUser);
    }catch{
      res.status(503).end();
    }
  }

  if(req.query.queryType === "updatePreferences"){
    // console.log("User preferences update request",req.body);
    try{
      let result = await Users.update({ preferences : req.body }, { where: { id: req.query.id }});
      res.send(req.body).status(200).end();
    }catch{
      res.status(503).end();
    }
  } 
  
  if(req.query.queryType === ""|| req.query.queryType === undefined) {
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
