const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");
//const { initUserModel } = require("./userModel");

const otpModel = {
  otp: {
    type:DataTypes.STRING,
  },
  otpExp:{
    type: DataTypes.BIGINT,
  },
  email:{
    type:DataTypes.STRING,
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
//const user = await initUserModel()
//otp.belongsTo(user, { foreignKey: 'user_id' });
await otp.sync({ alter: true });
    return otp;
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.ERROR,"internal server error");

  }
};

module.exports = {initotpModel}
