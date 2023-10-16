
const nodemailer = require('nodemailer');
const { RESPONSE } = require('../../config/global');
const { initUserModel } = require('../../model/userModel');
const { initotpModel } = require('../../model/otpModel');
const { send } = require('../../config/responseHelper');


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
  module.exports = { forgotPassword };