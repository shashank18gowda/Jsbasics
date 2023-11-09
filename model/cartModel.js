const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const  {initFoodModel}  = require("./FoodModel");
const { initUserModel } = require("./userModel");

const cartModel = {
    cart_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
     quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },

};

const initcartModel = async () => {
    try {
        const sequelize = await getConnection();
        const Food = await initFoodModel();
        const User = await initUserModel();
        const cart = sequelize.define("cart", cartModel, {
            freezeTableName: true,
        });

        cart.belongsTo(Food, { foreignKey: 'Food_id' });
        cart.belongsTo(User, { foreignKey: 'user_id' });
        await cart.sync({ alter: true });
        return cart;
    } catch (err) {
        console.log( err.message);
      return send(res, RESPONSE.ERROR,"internal server error");

    }
};

module.exports =  {initcartModel} ;
