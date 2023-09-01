// require ("dotenv").config();
// const AWS = require ("aws-sdk")
// const fs = require("fs")
// const secrets = require("./config")

// function createS3Instance(){
//     const s3 = new AWS.S3({
//         credentials:{
     
//             accessKeyId:secrets.awsCreds.accessKey,
//             secretAccessKey: secrets.awsCreds.secretKey,
//         },
        
//     });
//     return s3;
// }
// async function uploadFileText(fileObj,bucketName){
//     s3 = createS3Instance();
//     const fileStream = fs.createReadStream(fileObj.filepath);
//     const params ={
//         Body:fileStream,
//         Bucket:bucketName,
//         Key:fileObj.name
//     }
//     const uploadData = await s3.upload(params);
//     return uploadData;
// }

// module.exports ={uploadFileText}

// AWS.config.update({

//  region: process.env.AWS_REGION,
//  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });


// function uploadFile(file){
//    const fileStream = fs.createReadStream(file.path)
//    const  bucketName = process.env.AWS_BUCKET_NAME;
   
//     const uploadParams={
//         Bucket:bucketName,
//         Body:fileStream,
//         Key: file.filename
//     };
//     return s3.upload(uploadParams).promise();
// }


//download
// function getFile(key){
//     const downloadParams ={
//         Bucket:bucketName,  
//         Key: key
//     };
//   return s3.getObject(downloadParams).createReadStream()
// }


