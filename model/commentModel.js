const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { initFoodModel } = require("./FoodModel");
const { initUserModel } = require("./userModel");

const commentModel  = {
  comment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
  },
 
};

const initComment = async () => {
  try {
   
   // if (ratingCmt) return ratingCmt;
   const Food = await initFoodModel();
   const User = await initUserModel();

    const sequelize = await getConnection();
    
  const Comment = sequelize.define("Comment", commentModel, {
      freezeTableName: true,
    });
   
    Comment.belongsTo(Food, { foreignKey: 'Food_id' });
    Comment.belongsTo(User, { foreignKey: 'user_id' });

    await Comment.sync({ alter: true });
    return Comment;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { initComment };
