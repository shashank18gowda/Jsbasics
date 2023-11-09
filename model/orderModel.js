
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
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  user_id: {
    type: new DataTypes.INTEGER(),
    allowNull: false,
  },

  totalPrice: {
    type: new DataTypes.INTEGER(),
    allowNull: false,
  },
  address_id: {
    type: new DataTypes.INTEGER(),
    allowNull: true,
  },
  order_status: {
    type: new DataTypes.INTEGER(),
    allowNull: true,
  },
  pending: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  processing: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  shipped: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  dispatch: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  delivered: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  cancelled: {
    type: Sequelize.DATE,
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
    console.log(err.stack);
    return send(res, RESPONSE.ERROR, "internal server error");

  }
};

module.exports = { initorderModel };
