//const mongoose = require("mongoose")

const { DataTypes, Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");

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

let user = null;
const initUserModel = async (res) => {
  try {
   if (user) return user;
    const sequelize = await getConnection();
    user = sequelize.define("user", userSchema, {
      freezeTableName: true,
      timestamps: true,
    });

    await user.sync({ alter: true });
    return user;
  } catch (err) {
    console.log(err.stack);
    return send(res, RESPONSE.ERROR,"internal server error");

  }
};

module.exports = {initUserModel };


