const express = require('express');
const { initrating } = require('../../model/ratingModel'); // Import the Rating model
const { initFoodModel } = require('../../model/FoodModel'); // Import the Food model
const { getConnection } = require('../../config/dbConfig');
const bodyParser = require('body-parser');
const { send } = require('../../config/responseHelper');
const { RESPONSE } = require('../../config/global');

const app = express();

app.use(bodyParser.json());

const rating = async (req, res) => {
  try {

    const Rate = await initrating();
    const Food = await initFoodModel();

    const { rating } = req.body;
    const user_id= req.token.user.id;
    const { Food_id } = req.params;

    if (rating > 5) {
      return send(res, RESPONSE.ERROR,{message:"only 5 points are allowed"})
    }

    const food = await Food.findOne({ where: { Food_id: Food_id } });

    if (!food) {
      return send(res, RESPONSE.ERROR,{message: 'Food item not found.' });
    }

let existingRating = await Rate.findOne({ where: { Food_id: Food_id,user_id:user_id}});

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
    
      existingRating = await Rate.create({
        rating: rating,
        Food_id: Food_id,
        user_id:user_id
      });
    }

    return send(res, RESPONSE.SUCCESS,{ rating: existingRating });
  } catch (error) {
    console.error(error.stack);
    return send(res,RESPONSE.ERROR);
  }
};

const getRating = async (req, res) => {
  try {
    const Rate = await initrating();
    const { Food_id } = req.params;

    const food = await Rate.findOne({ where: { Food_id: Food_id } });

    if (!food) {
      return send(res, RESPONSE.ERROR, { message: 'Food item not found.' });
    }

    const rating = await Rate.findAll({ where: { Food_id: Food_id } });

    const totalRatings = rating.length;
    console.log(totalRatings);
  
   const averageRating = totalRatings > 0
   ? rating.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings : 0;

 return send(res, RESPONSE.SUCCESS, { averageRating });
  } catch (error) {
    console.error(error.message);
    return send(res, RESPONSE.ERROR,'Internal server error');
  }
};


const getRatingByUser = async (req, res) => {
  try {
    const Rate = await initrating();
     const user_id = req.params
     const rating = await Rate.findOne({ where: {  user_id:user_id} });

 return send(res, RESPONSE.SUCCESS, { rating });
  } catch (error) {
    console.error(error.message);
    return send(res, RESPONSE.ERROR,'Internal server error' );
  }
};
module.exports = { rating ,getRating,getRatingByUser }