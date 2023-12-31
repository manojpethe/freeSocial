var express = require('express');
var router = express.Router();
var Users = require("../model/users");
var db = require("../model/database");
const { Op } = require("sequelize");
var moment = require('moment');
/* GET users listing. */
router.get('/', async function(req, res, next) {
    // console.log(JSON.parse(req.cookies.userInfo).email);
    // get saved preferences
    // compose query based on age range / religion and country

  if(req.query.gender && req.query.id){
    console.log("Gender",req.query.gender);
    try{
      whereClause = {
        attributes: ['preferences'], 
        where: { id: req.query.id } 
      };
      const pref = await Users.findAll(whereClause);
      const preferences = pref[0].preferences;
      // console.log("Preferences------>",pref[0].preferences);
      let sql = "";
      if(preferences){
        sql = `
        SELECT * 
        FROM Users 
        where json_extract(profile,'$.gender') != '${req.query.gender}'\n`;
        
        let religionClause = "";
        if(preferences.religions.length){
          religionClause = "\tAND json_extract(profile,'$.religion') in ";
          let listOfReligions = "";
          for(let i = 0; i< preferences.religions.length; i++){
            if (listOfReligions){
              listOfReligions = listOfReligions + `,'${preferences.religions[i]}'`;
            } else {
              listOfReligions = `'${preferences.religions[i]}'`;
            }
          }
          religionClause = religionClause + "(" + listOfReligions + ") \n";
        }

        let countryClause = "";
        if(preferences.countries.length){
          countryClause = "\tAND json_extract(profile,'$.country') in ";
          let listOfCountries = "";
          for(let i = 0; i< preferences.countries.length; i++){
            if (listOfCountries){
              listOfCountries = listOfCountries + `,'${preferences.countries[i]}'`;
            } else {
              listOfCountries = `'${preferences.countries[i]}'`;
            }
          }
          countryClause = countryClause + "(" + listOfCountries + ") \n";
        }
        
        let ageClause = "";
        if(preferences.ageRange.length){
          console.log(preferences.ageRange);
          const sDate = moment();
          const eDate = moment();
          // 1990-01-01T18:30:00.000Z
          // 2003-12-06
          let startDate = sDate.subtract(preferences.ageRange[0],'years').format('YYYY-MM-DD')+'T00:00:00.000Z';
          let endDate = eDate.subtract(preferences.ageRange[1],'years').format('YYYY-MM-DD')+'T00:00:00.000Z';
          ageClause = "\tAND date(json_extract(profile,'$.birthDate')) between  '"+endDate+"' AND '"+startDate+"'";
        }
  
        sql = sql + religionClause + countryClause + ageClause;
      } else {
        sql = `SELECT * FROM Users where profile not like '%"gender":"${req.query.gender}"%'`;
      }
      
      // sql = `SELECT * FROM Users where json_extract(profile,'$.gender') != '${req.query.gender}'`;
      
      console.log(sql);
      // const response = await db.query(sql)
      const response = await db.query(sql);
      // const response = await db.query(`SELECT * FROM Users where profile not like '%"gender":"${req.query.gender}"%' `);
        res.send(response[0]).status(200).end();
      } catch(e){
        res.send(e).status(400).end();
      }
  } else {
    res.send(e).status(400).end();
  }
});

/* GET users listing. */
router.post('/', async function(req, res, next) {
  // console.log(JSON.parse(req.cookies.userInfo).email);
  // get saved preferences
  // compose query based on age range / religion and country

if( req.query.queryType === 'search' && req.query.gender && req.query.id){
  try{
    // whereClause = {
    //   attributes: ['preferences'], 
    //   where: { id: req.query.id } 
    // };
    // const pref = await Users.findAll(whereClause);
    // const preferences = pref[0].preferences;
    // console.log("Preferences------>",pref[0].preferences);
    const preferences = req.body;
    let sql = "";
    if(preferences){
      sql = `
      SELECT * 
      FROM Users 
      where json_extract(profile,'$.gender') != '${req.query.gender}'\n`;
      
      let religionClause = "";
      if(preferences.religions.length){
        religionClause = "\tAND json_extract(profile,'$.religion') in ";
        let listOfReligions = "";
        for(let i = 0; i< preferences.religions.length; i++){
          if (listOfReligions){
            listOfReligions = listOfReligions + `,'${preferences.religions[i]}'`;
          } else {
            listOfReligions = `'${preferences.religions[i]}'`;
          }
        }
        religionClause = religionClause + "(" + listOfReligions + ") \n";
      }

      let countryClause = "";
      if(preferences.countries.length){
        countryClause = "\tAND json_extract(profile,'$.country') in ";
        let listOfCountries = "";
        for(let i = 0; i< preferences.countries.length; i++){
          if (listOfCountries){
            listOfCountries = listOfCountries + `,'${preferences.countries[i]}'`;
          } else {
            listOfCountries = `'${preferences.countries[i]}'`;
          }
        }
        countryClause = countryClause + "(" + listOfCountries + ") \n";
      }

      let ageClause = "";
      if(preferences.ageRange.length){
        console.log(preferences.ageRange);
        const sDate = moment();
        const eDate = moment();
        // 1990-01-01T18:30:00.000Z
        // 2003-12-06
        let startDate = sDate.subtract(preferences.ageRange[0],'years').format('YYYY-MM-DD')+'T00:00:00.000Z';
        let endDate = eDate.subtract(preferences.ageRange[1],'years').format('YYYY-MM-DD')+'T00:00:00.000Z';
        ageClause = "\tAND date(json_extract(profile,'$.birthDate')) between  '"+endDate+"' AND '"+startDate+"'";
      }

      sql = sql + religionClause + countryClause + ageClause;
    } else {
      sql = `SELECT * FROM Users where profile not like '%"gender":"${req.query.gender}"%'`;
    }
    
    // sql = `SELECT * FROM Users where json_extract(profile,'$.gender') != '${req.query.gender}'`;
    
    console.log(sql);
    // const response = await db.query(sql)
    const response = await db.query(sql);
    // const response = await db.query(`SELECT * FROM Users where profile not like '%"gender":"${req.query.gender}"%' `);
      res.send(response[0]).status(200).end();
    } catch(e){
      res.send(e).status(400).end();
    }
} else {
  res.send(e).status(400).end();
}
});

module.exports = router;