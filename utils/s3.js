


require('dotenv').config();
const fs = require('fs');

const aws = require('aws-sdk');
const { RESPONSE } = require('../config/global');
const { send } = require('../helper/responseHelper');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

const constantParams = {
    Bucket: "node-postgress-x-aws-image"
}
//------------------------------------------------------------

function uploadToS3 (file,next)  {
    // const  file  = req.files;
    console.log('File path:', file.path);
    const fileStream = fs.createReadStream(file.path);

    const params = {
        Bucket: "node-postgress-x-aws-image",
        Key: file.filename,
      Body: fileStream,
    };
    s3.upload(params, (error, data) => {
      if (error) {
        //console.error(error);
        return send(res, RESPONSE.ERROR);
      } else {
        console.log('File uploaded successfully:', data.Location);
      
      }
    });
  }

//------------------------------------------------------------

async function getImageFromS3(key) {
    const params = {
      Bucket: 'node-postgress-x-aws-image',
      Key: key, 
    };
    try {
        const s3Object = await s3.getObject(params).promise();
        if (!s3Object.Body) {
          return send(res, RESPONSE.ERROR);
        }
        return {
          body: s3Object.Body,
          contentType: s3Object.ContentType,
        };
      } catch (error) {
        throw error;
      }
    }
    module.exports = { getImageFromS3, uploadToS3};
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