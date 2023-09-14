//const mongoose = require("mongoose")

const { DataTypes, Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { RESPONSE } = require("../config/global");

// const sequelize = new Sequelize('dev', 'postgres', 'sh@18', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // accessToken: {
  //   type: DataTypes.STRING,
  //   allowNull: true, 
  // },
};



const initUserModel = async () => {
  try {
    let User = null;
    if (User) return User;
    const sequelize = await getConnection();
    User = sequelize.define("User", userSchema, {
      freezeTableName: true,
      timestamps: true,
    });
    
    await User.sync({ alter: true });
    return User;
  } catch (err) {
    return send(res,RESPONSE.ERROR,err.message)
  }
};

module.exports = {initUserModel };


  //  module.exports = mongoose.model("User",userSchema);