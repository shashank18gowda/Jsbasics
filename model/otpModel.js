const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
const { initUserModel } = require("./userModel");

const otpModel = {
  otp: {
    type:DataTypes.STRING,
  },
  otpExp:{
    type: DataTypes.BIGINT,
  }


};
let otp  = null;
const initotpModel = async (res) => {
  try {
    if (otp) return otp;
    const sequelize = await getConnection();
  
    otp = sequelize.define("otp", otpModel, {
      freezeTableName: true,
    });
const user = await initUserModel()
otp.belongsTo(user, { foreignKey: 'user_id' });
await otp.sync({ alter: true });
    return otp;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {initotpModel}
