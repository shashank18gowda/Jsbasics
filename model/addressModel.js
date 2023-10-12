const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");

const { initUserModel } = require("./userModel");

const addressModel = {
  address_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  address: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

};

const initAddressModel = async () => {
  try {
    const sequelize = await getConnection();

    const address = sequelize.define("address", addressModel, {
      freezeTableName: true,
    });
    const User = await initUserModel();

    address.belongsTo(User, {
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
    console.log(err.stack);
  }
};

module.exports = { initAddressModel };
