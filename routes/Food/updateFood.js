const express = require("express")
const router = express.Router()
var validator = require('validator');
const moment = require("moment");
const s3Utils = require("../../middleware/s3")
const { send } = require("../../config/responseHelper")
const { initFoodModel } = require("../../model/FoodModel");
const { RESPONSE } = require("../../config/global");
//@access private
const updateFood = async (req, res) => {
    try {
        const { F_name, ingredients, description, category, cookTime, key } = req.body;
        const Food_id = req.params.Food_id;

        const Food = await initFoodModel();
        // console.log(Emp)
        const check = await Food.findOne({ where: { Food_id: Food_id, stat: true } });

        if (!check) {
            return send(res, RESPONSE.ERROR, "No Items Found");

        }

        const updateFoodList = {};

        if (F_name) {
            const existingEntryF_name = await Food.findOne({ where: { F_name: F_name } });

            if (existingEntryF_name) {
                return send(res, RESPONSE.ALREADY_EXIST);
            }
            updateFoodList.F_name = F_name;
        }

        if (ingredients) {
            updateFoodList.ingredients = [ingredients];
        }

        if (description) {
            updateFoodList.description = description;
        }

        if (category) {

            updateFoodList.category = [category];
        }
        if (cookTime) {
            if (!moment(cookTime, `mm:ss`, true).isValid()) {
                return send(res, RESPONSE.ERROR, "Please enter valid Time");
            }
            updateFoodList.cookTime = cookTime;
        }

        const updatedItem = await Food.update(updateFoodList,
            {
                where: { Food_id: Food_id, stat: true },
                returning: true
            }
        );

        if (!updatedItem) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }

        if (key) {
            console.log(key);
            const existingKey = key;
            const newImagePath = req.files;
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            if (allowedMimeTypes.includes(newImagePath.mimetype) || newImagePath.length === 0) {
                return send(res, RESPONSE.INVALID_FILE);
            }
            s3Utils.updateS3Image(existingKey, newImagePath, (updatedKey) => {
                if (updatedKey) {
                    return send(res, RESPONSE.SUCCESS, { updatedKey });
                } else {
                    return send(res, RESPONSE.ERROR);
                }
            });
        }

        return send(res, RESPONSE.D_UPDATED_SUCCESS);

    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);
    }
};

module.exports = { updateFood }
