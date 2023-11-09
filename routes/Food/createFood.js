const express = require("express")
const app = express()
var validator = require('validator');
const s3 = require('..//../middleware/s3');
const { send } = require("../../config/responseHelper")
const { RESPONSE } = require("../../config/global");
const { initFoodModel } = require("../../model/FoodModel");
const moment = require("moment");
const { initAdminModel } = require("../../model/AdminModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createFood = async (req, res) => {
    try {

        
        const Food = await initFoodModel();
        const Admin = await initAdminModel();
        const files = req.files;
        const { F_name, description, ingredients, category, cookTime ,F_price} = req.body;
        const existingEntryF_name = await Food.findOne({ where: { F_name: F_name } });
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
       
        if (allowedMimeTypes.includes(files.mimetype)) {
            return send(res, RESPONSE.ERROR, "invalid file");
        }

        if (files.length === 0) {
            return send(res, RESPONSE.ERROR, "invalid file");
        }

        if (!F_name) {
            return send(res, RESPONSE.ERROR,"first name is required");
        }
        if (!F_price) {
            return send(res, RESPONSE.ERROR,"price required");
        }
        if (!ingredients) {
            return send(res, RESPONSE.ERROR,"ingredient is required");
        }

        if (!description) {
            return send(res, RESPONSE.ERROR,"description is required");
        }

        if (!category) {
            return send(res, RESPONSE.ERROR,"category is required");
        }

        if (!moment(cookTime, `mm:ss`, true).isValid()) {
            return send(res, RESPONSE.ERROR,"Cook Time is reqired");
        }

        if (existingEntryF_name) {
            return send(res, RESPONSE.ERROR,"Food Name already exist");
        }

        for(const file of files) {
            const imageKey = `${file.filename}`;
            s3.uploadToS3(file, imageKey);
            await Food.create({
                F_name: F_name,
                description: description,
                category: [category],
                ingredients: [ingredients],
                cookTime: cookTime,
                imageKey: imageKey,
                F_price:F_price,
                admin_id: req.token.Admin.id
            });
        }

        return send(res, RESPONSE.SUCCESS,"New food added");
    }catch(err) {
        console.error(err.message);
        return send(res, RESPONSE.ERROR, err.stack);
    }
}
module.exports = { createFood }

