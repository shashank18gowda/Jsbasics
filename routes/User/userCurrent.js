const asyncHandler = require("express-async-handler");

require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { send } = require("../../config/responseHelper");



const currentUser = asyncHandler(async (req, res) => {
    return send(res, RESPONSE.SUCCESS, {User: req.user});

});


module.exports = {  currentUser };