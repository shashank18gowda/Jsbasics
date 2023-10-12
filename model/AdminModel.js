//const mongoose = require("mongoose")

const { DataTypes, Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");

const AdminSchema = {
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  adminname: {
    type: DataTypes.STRING,
    allowNull: false, // Make it not nullable
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    
  }
}

const initAdminModel = async (res) => {
  try {
    let Admin = null;
    if (Admin) return Admin;
    const sequelize = await getConnection();
    Admin = sequelize.define("Admin", AdminSchema, {
      freezeTableName: true,
      timestamps: true,
    });

    //Admin.hasMany(Food, { foreignKey: 'role' });

    await Admin.sync({ alter: true });
    return Admin;
  } catch (err) {
    return send(res,RESPONSE.ERROR,err.message)
  }
};

module.exports = {initAdminModel };


