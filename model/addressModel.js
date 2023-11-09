const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { initUserModel } = require("../model/userModel");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");



const addressModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
  },
}
let address = null;
const initAddressModel = async (res) => {
  try {
    if (address) return address;
    const sequelize = await getConnection();

    address = sequelize.define("address", addressModel, {
      freezeTableName: true,
    });
    const user = await initUserModel();
    user.hasMany(address, {
      as: "addressInfo",
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
      targetKey: "id",
    });

    await address.sync({ alter: true });
    return address;
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.ERROR, "internal server error");


  }
};

module.exports = { initAddressModel }
