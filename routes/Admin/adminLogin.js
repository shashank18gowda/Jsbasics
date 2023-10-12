const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { initAdminModel } = require("../../model/AdminModel");
const { send } = require("../../config/responseHelper");


const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email) {
            return res.send(RESPONSE.MAN_EMAIL);
        }
        if (!password) {
            return res.send(RESPONSE.MAN_PASSWORD);
        }
        const Admin = await initAdminModel();
        const admin = await Admin.findOne({ where: { email: email } });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            const accessToken = jwt.sign(
                {
                    Admin: {
                        Adminname: admin.adminname,
                        email: admin.email,
                        id: admin.id,
                        role:admin.role
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "48h" }
            );
            return send(res, RESPONSE.SUCCESS, {accessToken: accessToken});
                } else {
            return send(res,RESPONSE.INVALID_CRED);
        }
    }
    catch (err) {
        console.error(err);
        return send(res,RESPONSE.ERROR,err.message);
    }
}
module.exports = { loginAdmin};