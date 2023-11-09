
const { initComment } = require('../../model/commentModel'); // Import the comment model
const { initFoodModel } = require('../../model/FoodModel'); // Import the Food model
const { getConnection } = require('../../config/dbConfig');

const { send } = require('../../config/responseHelper');
const { RESPONSE } = require('../../config/global');




const comment = async (req, res) => {
  try {

    const Comment = await initComment();
    const Food = await initFoodModel();
    const user_id = req.token.user.id
    const { comment } = req.body;
    const { Food_id } = req.params;
    console.log(comment);
    const food = await Food.findOne({ where: { Food_id: Food_id } });

    if (!food) {
      return send(res, RESPONSE.ERROR, { message: 'Food item not found.' });
    }

    if (!comment) {
      return send(res, RESPONSE.ERROR, { message: 'cannot send empty comment' });
    }

    const newcomment = await Comment.create({
      comment: comment,
      Food_id: Food_id,
      user_id: user_id
    });

    return send(res, RESPONSE.SUCCESS, { comment: newcomment });
  } catch (error) {
    console.error(error.message);
    return send(res, RESPONSE.ERROR, "internal server error");

  }
};



const getComment = async (req, res) => {
  try {

    const Comment = await initComment();

    const { Food_id } = req.params;

    const food = await Comment.findOne({ where: { Food_id: Food_id } });

    if (!food) {
      return send(res, RESPONSE.ERROR, { message: 'Food item not found.' });
    }

    const comments = await Comment.findAll({ where: { Food_id: Food_id } });

    return send(res, RESPONSE.SUCCESS, { comments: comments });
  } catch (error) {
    console.error(error.message);
    return send(res, RESPONSE.ERROR, "internal server error");

  }
};



module.exports = { comment, getComment }

