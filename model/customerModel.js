const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");

const CustModel = {
  // user_id:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref:"User"
  // },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  F_name: {
    type: DataTypes.STRING,
    required: true
  },
  L_name: {
    type: DataTypes.STRING,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  dob: {
    type: DataTypes.DATE,
    required: true,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    require: true
  },
  stat: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  acc_num: {
    type: DataTypes.STRING,
    unique: true,
    require: true
   
  },

};

const initCustModel = async () => {
  try {
    let Cust = null;
    if (Cust) return Cust;
    const sequelize = await getConnection();

    Cust = sequelize.define("Cust", CustModel, {
      freezeTableName: true,
    });


    await Cust.sync({ alter: true });
    return Cust;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { initCustModel };





