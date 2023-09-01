const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const registerUser = asyncHandler(async (req, res) => {

try{
    const { username, email, password } = req.body;
    const val = validator.isEmail(req.body.email);

    const userAvailable = await User.findOne({ email: email });

    if (!username) {
        return res.send("username is mandaory");
    }
    if (!email ) {
        return res.send("email is mandaory");
    }
    if (!password) {
        return res.send("password is mandaory");
    }
    if (!val) {
        return res.send("provde appropriate email");
    }
    if (userAvailable) {
        return res.send("user already exists");
    }

    //hash Pass
    const hashpassword = await bcrypt.hash(password, 10);
    console.log("hashPass: ", hashpassword);

    const user = await User.create({
        username,
        email,
        password: hashpassword
    });
    res.send(`user created succesffuly ${user}`);
}catch(er){
    res.send(er,`something went wrong`);

}
});
//=======================================================================
const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if (!email) {
        return res.send("email are mandaory");
    }
    if (!password) {
        return res.send("password are mandaory");
    }  
    
    const user = await User.findOne({email});
   
   
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
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser };