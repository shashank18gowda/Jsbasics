const express = require("express")
const router = express.Router()
const Image = require('../../models/EmpModel');
const { RESPONSE } = require("../../config/global");
const { send } = require("../../helper/responseHelper");
const { getImageFromS3 } = require('../../utils/s3');

const getImg = async (req, res) => {
  try {
    const { key } = req.params;

    const s3Image = await getImageFromS3(key);



    if (!s3Image.body) {
      return send(res, RESPONSE.IMG_NOT_FOUND);
    }
    const contentType = s3Image.contentType;
    res.setHeader('Content-Type', ['image/jpg', 'image/jpeg', 'image/png']);


    res.send(s3Image.body);

    //const Burl = image.url;
    //return res.json({image})

    // res.setHeader('Content-Type', ['image/jpeg','image/jpg','image/png']); // Adjust content type as needed

    // Stream the image data to the response

  } catch (error) {
    console.log(error.stack);

    return send(res, RESPONSE.CANT_RETRIVE_SINGLE_FILE);
  }
};

module.exports = { getImg };