const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../config/global")
const { initUserModel } = require("../models/userModel");



const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const val = validator.isEmail(req.body.email);
        const User = await initUserModel();

        //   const userAvailable = await User.findOne({ where: { email: email } });


        if (!username) {
            return res.send(RESPONSE.MAN_USERNAME);

        }
        if (!email) {
            return res.send(RESPONSE.MAN_EMAIL);

        }
        if (!password) {
            return res.send(RESPONSE.MAN_PASSWORD);

        }
        if (!val) {
            return res.send(RESPONSE.EMAIL_INVALID);

        }


        const userAvailable = await User.findOne({ where: { email: email } });
        if (userAvailable) {
            return res.send(RESPONSE.USER_ALREADY_EXIST);
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
        return res.status(200).send(user)
        // return res.send(RESPONSE.U_CREATED_SUCCESS, `${user}`);

    } catch (err) {
        return res.status(500).send(err.message)
        //return res.send(err, RESPONSE.ERROR);

    }


};
//=======================================================================
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
                { expiresIn: "1h" }
            );
            res.status(200).json({ accessToken });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}
//==========================



const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser };