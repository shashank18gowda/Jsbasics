const express = require("express")
const app = express()
var validator = require('validator');
const s3 = require('..//../middleware/s3');
const { send } = require("../../config/responseHelper")
const { RESPONSE } = require("../../config/global");
const { initFoodModel } = require("../../model/FoodModel");
const moment = require("moment");
const { initAdminModel } = require("../../model/AdminModel");
//const { initWishlistModel } = require("../../model/wishListModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createFood = async (req, res) => {
    try {

        
        const Food = await initFoodModel();
        const Admin = await initAdminModel();
        const files = req.files;
        const { F_name, description, ingredients, category, cookTime } = req.body;
        const existingEntryF_name = await Food.findOne({ where: { F_name: F_name } });
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
       
       
        if (allowedMimeTypes.includes(files.mimetype)) {
            return send(res, RESPONSE.ERROR, "invalid file");
        }

        if (files.length === 0) {
            return send(res, RESPONSE.ERROR, "invalid file");
        }

        if (!F_name) {
            return send(res, RESPONSE.F_NAME);
        }

        if (!ingredients) {
            return send(res, RESPONSE.INGREDIENT);
        }

        if (!description) {
            return send(res, RESPONSE.DESCRIPTION);
        }

        if (!category) {
            return send(res, RESPONSE.CATEGORY);
        }

        if (!moment(cookTime, `mm:ss`, true).isValid()) {
            return send(res, RESPONSE.TIME);
        }

        if (existingEntryF_name) {
            return send(res, RESPONSE.ALREADY_EXIST);
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
                admin_id: req.token.Admin.id
            });
        }

        return send(res, RESPONSE.D_INSERT_SUCCESS);
    }catch(err) {
        console.error(err.message);
        return send(res, RESPONSE.ERROR, err.stack);
    }
}
module.exports = { createFood }

