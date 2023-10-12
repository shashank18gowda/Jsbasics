
const bcrypt = require("bcrypt");

var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { send } = require("../../config/responseHelper")

const { initUserModel } = require("../../model/userModel");



const registerUser = async (req, res) => {
    try {
        const { username, email, password ,phNumber ,role } = req.body;
        const val = validator.isEmail(req.body.email);
        const vph = validator.isMobilePhone(req.body.phNumber) && req.body.phNumber.toString().length === 10
       // const user_id = req.user.id
        const User = await initUserModel();
        const existingEntrypH = await User.findOne({ where: { phNumber: phNumber } });

        //   const userAvailable = await User.findOne({ where: { email: email } });


        if (!username) {
            return send(res, RESPONSE.MAN_USERNAME);

        }
        if (!email) {
            return send(res, RESPONSE.MAN_EMAIL);
        }
        if (!phNumber) {
            return send(res, RESPONSE.ERROR,"phone is mandatory");

        }
        if (existingEntrypH) {
            return send(res, RESPONSE.ERROR,"phone number already exists");

        }
        if (!password) {
            return send(res, RESPONSE.MAN_PASSWORD);
        }
        if (!val) {
            return send(res, RESPONSE.EMAIL_INVALID);

        }
        if (!vph) {
            return send(res, RESPONSE.ERROR,"invalid phone number");
        }


        const userAvailable = await User.findOne({ where: { email: email } });
        if (userAvailable) {
            return send(res, RESPONSE.USER_ALREADY_EXIST);
        }
       
        const hashpassword = await bcrypt.hash(password, 10);
   
      const user = await User.create({
            username,
            email,
            password: hashpassword,
            phNumber:phNumber,
            // user_id:user_id,
            role
        });
        // return send(res, send(user))
        return send(res,RESPONSE.U_CREATED_SUCCESS);

    } catch (err) {
        console.log(err);
        return send(res, RESPONSE.ERROR, err.message)
           }


};
//=======================================================================



module.exports = { registerUser  };