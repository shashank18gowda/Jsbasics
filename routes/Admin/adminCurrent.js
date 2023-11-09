const asyncHandler = require("express-async-handler");

require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { send } = require("../../config/responseHelper");



const currentAdmin = asyncHandler(async (req, res) => {
    return send(res, RESPONSE.SUCCESS);

});


module.exports = {  currentAdmin };