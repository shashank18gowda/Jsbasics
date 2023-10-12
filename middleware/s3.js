


require('dotenv').config();
const fs = require('fs');

const aws = require('aws-sdk');
const { send } = require('../config/responseHelper');
const { RESPONSE } = require('../config/global');


aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

const constantParams = {
  Bucket: "crudflutter-food"
}
//------------------------------------------------------------

function uploadToS3(file, next) {
  // const  file  = req.files;
  console.log('File path:', file.path);
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: "crudflutter-food",
    Key: file.filename,
    Body: fileStream,
  };
  s3.upload(params, (error, data) => {
    if (error) {
      // Check if the response has already been sent
      if (!res.headersSent) {
        // Send the error response
        return send(res, RESPONSE.ERROR);
      } else {
        // Log the error or handle it in some other way
        console.error(error);
      }
    } else {
      console.log('File uploaded successfully:', data.Location);
    }
  });
}

//------------------------------------------------------------

async function getImageFromS3(key) {
  const params = {
    Bucket: 'crudflutter-food',
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

//------------------------------------------------------------


async function updateS3Image(existingKey, newFilePaths) {
  try {
    // Check if the existing image exists
    const params = {
      Bucket: "crudflutter-food",
      Key: existingKey,
    };

    const existingObject = await s3.headObject(params).promise();

    if (!existingObject) {
      return send(res, RESPONSE.IMG_NOT_FOUND);
    }
    for (const newFilePath of newFilePaths) {
      const fileStream = fs.createReadStream(newFilePath.path);

      const uploadParams = {
        Bucket: "crudflutter-food",
        Key: existingKey,
        Body: fileStream,
      };
      await s3.upload(uploadParams).promise();
    }
    return `/emp/getImg/${existingKey}`;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return send(res,RESPONSE.ERROR);
  }
}










// Upload the new image and replace the existing one
// s3.upload(uploadParams, (error, data) => {
//   if (error) {
//     //console.error(error);
//     return send(res, RESPONSE.ERROR);
//   } else {
//     console.log('File updated successfully:');
//     callback(`/emp/getImg/${existingKey}`);
//   }
// });
  
module.exports = { getImageFromS3, uploadToS3, updateS3Image };

// exports.deleteFileFromS3 = (key, next) => {
//     const deleteParams = {
//         Key: key,
//         ...constantParams
//     };
//     s3.deleteObject(deleteParams, (error, data) => {
//         next(error, data);
//     });
// };

