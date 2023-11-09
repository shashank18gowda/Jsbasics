const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { initFoodModel } = require("./FoodModel");
const { initUserModel } = require("./userModel");

const ratingModel = {
  Rating_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: DataTypes.FLOAT,

  },
  user_id: {
    type: DataTypes.INTEGER,
  },


};

const initrating = async () => {
  try {
    const sequelize = await getConnection();
    const User = await initUserModel()
    const Food = await initFoodModel();


    const Rating = sequelize.define("Rating", ratingModel, {
      freezeTableName: true,
    });

    Rating.belongsTo(Food, { foreignKey: 'Food_id' });
    Rating.belongsTo(User, { foreignKey: 'user_id' });

    await Rating.sync({ alter: true });
    return Rating;
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.ERROR,"internal server error");

  }
};

module.exports = { initrating };
