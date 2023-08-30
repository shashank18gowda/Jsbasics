const path = require('path');
require('dotenv').config();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

const constantParams = {
    Bucket: process.env.AWS_BUCKET_NAME
}
//------------------------------------------------------------

exports.uploadToS3 = (file, next) => {
    const fileStream = fs.createReadStream(file.tempFilePath);
    console.log(file.tempFilePath)

    //   const bucketName = process.env.AWS_BUCKET_NAME; 
    const params = {
        Bucket: constantParams.Bucket,
        Body: fileStream,
        Key: file.name
    };

    s3.upload(params, (error, data) => {
        console.log(error, data);
        next(error, data);
    });
};

//------------------------------------------------------------

exports.getFileFromS3 = key => {
    const downloadParams = {
        Key: key,
        ...constantParams
    };
    return s3.getObject(downloadParams).createReadStream();
};

//------------------------------------------------------------

exports.deleteFileFromS3 = (key, next) => {
    const deleteParams = {
        Key: key,
        ...constantParams
    };
    s3.deleteObject(deleteParams, (error, data) => {
        next(error, data);
    });
};