//const mongoose = require("mongoose")

const { DataTypes, Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");
//const { initAddressModel } = require("./addressModel");

const userSchema = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Make it not nullable
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type:DataTypes.INTEGER,
    defaultValue: 2,
  }
}

const initUserModel = async (res) => {
  try {
   // const address = await initAddressModel()
    let User = null;
    if (User) return User;

    const sequelize = await getConnection();
    User = sequelize.define("User", userSchema, {
      freezeTableName: true,
      timestamps: true,
    });
    // User.belongsTo(address, { foreignKey: 'address' ,targetKey:'address'});
    
    await User.sync({ alter: true });
    return User;
  } catch (err) {
    return send(res,RESPONSE.ERROR,err.message)
  }
};

module.exports = {initUserModel };


