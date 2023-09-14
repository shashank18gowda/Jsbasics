const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../config/global")
const { initUserModel } = require("../models/userModel");
const { send } = require("../helper/responseHelper");


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email) {
            return res.send(RESPONSE.MAN_EMAIL);
        }
        if (!password) {
            return res.send(RESPONSE.MAN_PASSWORD);

        }
        const User = await initUserModel();
        
        //const User = await initUserModel();
        const user = await User.findOne({ where: { email: email } });
       // const user = await User.findOne({ where: { email: email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "24h" }
            );
            return send(res, RESPONSE.SUCCESS, {accessToken: accessToken});
                } else {
            return send(res,RESPONSE.INVALID_CRED,{});
        }
    }
    catch (err) {
        console.error(err);
        return send(res,RESPONSE.ERROR,err.message);
    }
}

module.exports = { loginUser};