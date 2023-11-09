const express = require('express');
const {send}= require("../../config/responseHelper")
const {initFoodModel} = require("../../model/FoodModel")
const router = express.Router();
// app.use(express.json());
const { RESPONSE } = require("../../config/global");
const { Op } = require('sequelize');
const searchFood = async (req, res) => {
    try {
        const schema = await initFoodModel();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const searchKey = req.params.key;

    //     const regexSearchKey = new RegExp(searchKey, "i");
    //     // const phoneSearchKey = searchKey.toString();
    //     // const phone1 = new RegExp(phoneSearchKey, "i");
    //     const query = {
    //         stat: true,
    //         $or: [
    //             { "name": { $regex: regexSearchKey } },
    //             { "email": { $regex: regexSearchKey } },
    //   //          { "phone": { $regex: phone1 } }

    //         ]
    //     };
    const query = {
        stat: true,
        [Op.or]: [
          { F_name: { [Op.iLike]: `%${searchKey}%` } },
        //   { L_name: { [Op.iLike]: `%${searchKey}%` } },
         // { phone: { [Op.iLike]: `%${searchKey}%` } },

              ],
      };
        const totalCount = await schema.count({wwhere:query});

        const data = await schema.findAll({
            where: query,
            offset: skip,
            limit: limit,
          });

        const response = {
            data: data,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        };

        return send(res, RESPONSE.SUCCESS,response );
    } catch (error) {
        console.log(error.stack)
        return send(res, RESPONSE.ERROR );

    }
};



module.exports ={searchFood}



