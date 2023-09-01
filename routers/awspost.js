const express = require ("express")
var router = express();

const { uploadFile,getFile } = require('../src/s3-service');

const multer = require("multer");
const upload = multer({
    dest:"aws-upload/"
})
  router.post("/",upload.single("image"), async(req,res)=>{
    const file = req.file
  
    console.log(file);
    const result = await uploadFile(file);
  res.send("ok");
  });

router.get("/:key",(req,res)=>{
    const key = req.params.key
    const result =  getFile(key);
    result.pipe(res);
})



module.exports = router;

    