const  {initFoodModel} = require("../../model/FoodModel");
const { RESPONSE } = require("../../config/global");
const express = require("express")
const router = express.Router()
const { send } = require("../../config/responseHelper");
const { Sequelize } = require("sequelize");
const  {initWishlistModel}  = require("../../model/wishListModel");

// @access private
const getFood = async (req, res) => {
   try {
        const { Food_id } = req.params
        const user_id = req.token.user.id;
        console.log(req.token.user.id);
        const Food = await initFoodModel();
        const wishlist = await initWishlistModel();
        
        let check = await Food.findOne({ where: { Food_id: Food_id, stat: true }, });
if(!check){
    return send(res, RESPONSE.ERROR, "Food item not found")
}


        let isWishlisted = await wishlist.findOne({ where: { Food_id: Food_id, user_id: user_id , } })
        console.log(isWishlisted);
       
        if (isWishlisted) {
            check = {
                Food_id: check.Food_id,
                F_name: check.F_name,
                description: check.description,
                ingredients: check.ingredients,
                category:check.category,
                cookTime:check.cookTime,
                isWishlistedFlag: 1
            }

            return send(res, RESPONSE.SUCCESS, check)
        }
        else{
            check = {
                Food_id: check.Food_id,
                F_name: check.F_name,
                description: check.description,
                ingredients: check.ingredients,
                category:check.category,
                cookTime:check.cookTime,
                isWishlistedFlag: 0
            }

            return send(res, RESPONSE.SUCCESS, check)
        }
    
    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.stack)
    }
};




const getFoodCat = async (req, res) => {
    try {
        const schema = await initFoodModel();
        const { category } = req.params;
        const categoryArray = category.split(',');
        const check = await schema.findAll({
            attributes: ['F_name', 'cookTime', 'category', 'ingredients', 'description'],

            where: {

                category: {
                    [Sequelize.Op.overlap]: categoryArray
                },
                stat: true,
            }
        });

        if (!check) {
            return send(res, RESPONSE.ENTRY_NF);
        }

        return send(res, RESPONSE.SUCCESS, check);

    } catch (err) {
        console.log("dsfdf", err.stack);
        return send(res, RESPONSE.ERROR, "jfkffff");
    }
};
module.exports = { getFood, getFoodCat }






