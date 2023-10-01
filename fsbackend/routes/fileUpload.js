var express = require('express');
var router = express.Router();
var Users = require("../model/users");

/* GET users listing. */
router.get('/', async function(req, res, next) {
    console.log("fileUpload get request.....");
    console.log(req.query);
    res.send({message:"OK"}).status(200).end();
});

router.post('/', async function(req, res, next) {
    console.log("fileUpload post request.....");
    console.log("length",req.files.fileUploadClient.length);
    // if(!req.files.fileUploadClient.length){
    //     console.log(req.files.fileUploadClient);
    // }
    var filesUploadedByUser = [];
    // console.log(req.files);
    try{
        if(req.files.fileUploadClient.length){
            req.files.fileUploadClient.forEach(element => {
                const fileName = req.query.email+"/"+element.name;
                element.mv('./public/filestorage/'+fileName);
                filesUploadedByUser.push(fileName);
            });
        } else {
            console.log(req.files.fileUploadClient);
            const fileName = req.query.email+"/"+req.files.fileUploadClient.name;
            req.files.fileUploadClient.mv('./public/filestorage/'+fileName);
            filesUploadedByUser.push(fileName);
        }
    }catch(e){
        console.log(e);
    }
    console.log(filesUploadedByUser);
    res.send({message:"OK"}).status(200).end();
});

module.exports = router;
