const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../config/global")
const { initUserModel } = require("../models/userModel");
const { send } = require("../helper/responseHelper");



const currentUser = asyncHandler(async (req, res) => {
    return send(res, RESPONSE.SUCCESS, {User: req.user});

});


module.exports = {  currentUser };