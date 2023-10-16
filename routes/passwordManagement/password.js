
const nodemailer = require('nodemailer');
const { RESPONSE } = require('./config/global');
const { initUserModel } = require('./model/userModel');
const { initotpModel } = require('./model/otpModel');

const { send } = require('./config/responseHelper');
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  console.log(email);

  try {
    const User = await initUserModel();
    const otpModel = await initotpModel();
    const user_id = req.token.user.id
    console.log(otpModel);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return send(res, RESPONSE.ERROR, "User not found");
    }

    sentOTP = Math.floor(1000 + Math.random() * 9000);
    console.log(sentOTP);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'shashank18gowda@gmail.com',
        pass: 'jnxwceqzehtnifbe'
      }
    });

    const mailOptions = {
      from: 'shashank@accelerlab.in',
      to: email,
      subject: 'Password Reset Request',
      text: `Your OTP for password reset is: ${sentOTP}`,
    };

    transporter.sendMail(mailOptions, async (err) => {
      if (err) {
        console.log(err);
        res.send('Error sending email');
      } else {
        resetPasswordExpires = Date.now() + 600000;
        console.log(resetPasswordExpires);

        const existingOTP = await otpModel.findOne({ where: { user_id: user_id } })
        if (existingOTP) {
          existingOTP.otp = sentOTP;
          existingOTP.otpExp = resetPasswordExpires;
          await existingOTP.save();
        } else {
          await otpModel.create({
            otp: sentOTP,
            user_id: user_id,
            otpExp: resetPasswordExpires
          });
        }

      }
      console.log(`OTP sent to ${email}`);
      return send(res, RESPONSE.SUCCESS, 'OTP sent to your email');
    });

  } catch (err) {
    console.log(err.stack);
    return send(res, RESPONSE.ERROR, err.message);
  }
};
//========================================================================
const checkOTP = async (req, res) => {

  try {
    const otpModel = await initotpModel()
    const user_id = req.token.user.id

    const checkOTP = await otpModel.findOne({ where: { user_id: user_id } })

    // console.log("chechOTP",checkOTP.otp);
    const { otp } = req.body

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

module.exports = { forgotPassword, resetPassword, checkOTP };
