const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../config/global")
const { send } = require("../helper/responseHelper")

const { initUserModel } = require("../models/userModel");



const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const val = validator.isEmail(req.body.email);
        const User = await initUserModel();

        //   const userAvailable = await User.findOne({ where: { email: email } });


        if (!username) {
            return send(res, RESPONSE.MAN_USERNAME);

        }
        if (!email) {
            return send(res, RESPONSE.MAN_EMAIL);

        }
        if (!password) {
            return send(res, RESPONSE.MAN_PASSWORD);

        }
        if (!val) {
            return send(res, RESPONSE.EMAIL_INVALID);

        }


        const userAvailable = await User.findOne({ where: { email: email } });
        if (userAvailable) {
            return send(res, RESPONSE.USER_ALREADY_EXIST);
        }
        // const userCount = await User.count({ where: { email: email } });

        // if (userCount > 0) {
        //     return res.send(RESPONSE.USER_ALREADY_EXIST);
        // }
        //hash Pass
        const hashpassword = await bcrypt.hash(password, 10);
        // console.log("hashPass: ", hashpassword);

      const user = await User.create({
            username,
            email,
            password: hashpassword
        });
        // return send(res, send(user))
        return send(res,RESPONSE.U_CREATED_SUCCESS);

    } catch (err) {
        return send(res, RESPONSE.ERROR, err.message)
        //return res.send(err, RESPONSE.ERROR);

    }


};
//=======================================================================



module.exports = { registerUser  };