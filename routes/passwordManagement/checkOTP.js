
const { initotpModel } = require('../../model/otpModel');
const { send } = require('../../config/responseHelper');
const { RESPONSE } = require('../../config/global');
const checkOTP = async (req, res) => {

    try {
      const otpModel = await initotpModel()
     
      const { otp,email } = req.body
  
      const checkOTP = await otpModel.findOne({ where: { email: email } })
  
   
  if(!checkOTP){
    return send(res, RESPONSE.ERROR, { message: 'regenerate otp' })
  
  }
  
      const linkExp = checkOTP.otpExp > Date.now()
      console.log("awjefjwqejf", linkExp);
  
      if (linkExp !== true) {
        return send(res, RESPONSE.ERROR, { message: 'Reset link has expired' })
      } else if (otp !== checkOTP.otp) {
        return send(res, RESPONSE.ERROR, { message: 'invaid OTP' })
  
      }
      await checkOTP.destroy();
      return send(res, RESPONSE.SUCCESS, "otp matched successfully")
  
    } catch (err) {
      console.log(err.stack);
      return send(res, RESPONSE.ERROR, err.message);
    }
  }
  
  module.exports = {  checkOTP };  