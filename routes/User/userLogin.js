const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { initUserModel } = require("../../model/userModel");
const { send } = require("../../config/responseHelper");


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        
        
        if (!email) {
            return res.send(RESPONSE.ERROR,"Email is mandatory");
        }
        if (!password) {
            return res.send(RESPONSE.ERROR,"password is mandatory");

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
                        role:user.role
                        
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "48h" }
            );
            return send(res, RESPONSE.SUCCESS, {accessToken: accessToken});
                } else {
            return send(res,RESPONSE.ERROR,"invalid credential");
        }
    }
    catch (err) {
        console.error(err);
        return send(res,RESPONSE.ERROR,err.message);
    }
}

module.exports = { loginUser};