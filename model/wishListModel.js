const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const  {initFoodModel}  = require("./FoodModel");
const { initUserModel } = require("./userModel");

const wishlistModel = {
    wishList_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
};

const initWishlistModel = async () => {
    try {
        const sequelize = await getConnection();
        const Food = await initFoodModel();
        const User = await initUserModel();
        const Wishlist = sequelize.define("Wishlist", wishlistModel, {
            freezeTableName: true,
        });

        Wishlist.belongsTo(Food, { foreignKey: 'Food_id' });
        Wishlist.belongsTo(User, { foreignKey: 'user_id' });
        await Wishlist.sync({ alter: true });
        return Wishlist;
    } catch (err) {
        console.log("oaoao", err.message);
      return send(res, RESPONSE.ERROR,"internal server error");

    }
};

module.exports =  {initWishlistModel} ;