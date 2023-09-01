const express = require("express")
var router = express();
// require ("dotenv").config();
// //const {  } = require('../s3');
require ("dotenv").config();
const AWS = require ("aws-sdk")
const fs = require("fs")


// const AWS = require('aws-sdk');
AWS.config.update({

    region: process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   });
   const s3 = new AWS.S3();
   


// const keys =require("../s3")
router.get('/download', (req, res) => {
   
    const  bucketName = process.env.AWS_BUCKET_NAME;
    const imageKey = `aws-upload/demon-slayer-kimetsu-1920x1080.jpg`; 
     
// Set up parameters for the getObject request
const params = {
  Bucket: bucketName,
  Key: imageKey
};



s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error downloading image:', err);
  } else {
    
    fs.writeFileSync('downloaded_image.jpg', data.Body);
    console.log('Image downloaded successfully');
  }
});
});


module.exports = router;

// router.get('/:imageName', (req, res) => {
//     const imageName = req.params.imageName;
//     const bucketName = keys.AWS_BUCKET_NAME;
   
//     const params = {
//       Bucket: bucketName,
//       Key: imageName,
//     };
  
//     s3.getObject(params, (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving image from S3');
//       }
  
//       res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//       res.end(data.Body);
//     });
//   });

  

// // router.get("/:imageName", async (req, res) => {
// //     const imageName = req.params.imageName;

// //     const params = {
// //       Bucket: bucketName,
// //       Key: `uploads/${imageName}`
// //     };

// //  s3.getObject(params, (err, data) => {
// //     if (err) {
// //       console.error('Error retrieving image:', err);
// //       return res.status(404).json({ message: 'Image not found' });
// //     }
// //     res.setHeader('Content-Type', data.ContentType);
// //     res.send(data.Body);
// //   });
// // });

// module.exports = router;




