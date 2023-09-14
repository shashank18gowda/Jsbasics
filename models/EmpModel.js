//const mongoose = require("mongoose")


const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { initUserModel } = require("./userModel");
const  UserModel  = require("./userModel");

const EmpModel= {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //     references: {
  //     model: 'User',
  //     key: 'id',
  //   },
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  stat: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  imageKey: {
    type: DataTypes.STRING, 
},
}

const initEmpModel = async () => {
  try {
    let Emp = null;
    if (Emp) return Emp;
    const sequelize = await getConnection();
    const User = await initUserModel();
    Emp = sequelize.define("Emp", EmpModel, {
      freezeTableName: true,
    });
    
    Emp.belongsTo(User, { foreignKey: 'user_id' });

    await Emp.sync({ alter: true });
    return Emp;
  } catch (err) {
    return send(res,RESPONSE.ERROR,err.message)
  }
};

module.exports = { initEmpModel };