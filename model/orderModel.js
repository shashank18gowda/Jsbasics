
const { DataTypes, Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");

const orderSchema = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: new DataTypes.INTEGER(),
    primaryKey: true,
  },
  
  mop: {
    type: new DataTypes.INTEGER(),
    allowNull: true,
  },

  food_id: {
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  
  user_id:{
    type: new DataTypes.INTEGER(),
    allowNull: false,
  },

  totalPrice:{
    type: new DataTypes.INTEGER(),
    allowNull: false,
  },
  address_id:{
    type: new DataTypes.INTEGER(),
    allowNull: true,
  }
  
}

const initorderModel = async (res) => {
  try {
    let order = null;
    if (order) return order;
    const sequelize = await getConnection();
    order = sequelize.define("order", orderSchema, {
      freezeTableName: true,
      timestamps: true,
    });


    await order.sync({ alter: true });
    return order;
  } catch (err) {
    return send(res,RESPONSE.ERROR,err.message)
  }
};

module.exports = {initorderModel };
