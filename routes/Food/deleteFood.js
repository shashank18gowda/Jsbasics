const { initFoodModel } = require("../../model/FoodModel")
const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper")
//@access private

const deleteFood = async (req, res) => {
  try {
    const { Food_id } = req.params;
    const schema = await initFoodModel();
    //console.log(schema);

    const itemToDelete = await schema.findOne({ where: { Food_id: Food_id, stat: true } });

    if (!itemToDelete) {
      return send(res, RESPONSE.ERROR,"Entry not found");
    }

    const updatedItem = await schema.update(
      { stat: false },
      {
        where: { Food_id: Food_id, stat: true },
        returning: true
      }
    );

    if (!updatedItem) {
      return send(res, RESPONSE.ERROR,"Item not found");
    }

    return send(res, RESPONSE.ERROR,"Data deleted successfully");
  } catch (err) {
   console.log(err.stack);
    return send(res, RESPONSE.ERROR, err.stack)
  }
};

module.exports = { deleteFood }
