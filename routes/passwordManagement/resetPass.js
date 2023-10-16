

const { RESPONSE } = require('../../config/global');
const { initUserModel } = require('../../model/userModel');
const { send } = require('../../config/responseHelper');
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    const User = await initUserModel();
    const { email, password, confirm_password } = req.body;
    try {
      if (password === confirm_password) {
        const hashpassword = await bcrypt.hash(password, 10);
  
        const user = await User.findOne({
          where: { email },
        });
        if (user) {
          user.password = hashpassword;
          await user.save();
          return send(res, RESPONSE.SUCCESS, { message: 'Password reset successful' });
        } else {
          return send(res, RESPONSE.ERROR, { message: 'User not found' });
        }
      }
      return send(res, RESPONSE.ERROR, { message: 'Passwords do not match' });
  
    } catch (err) {
      console.log(err.stack);
      return send(res, RESPONSE.ERROR, err.message);
    }
  };
  module.exports = {resetPassword };