const bcrypt = require("bcrypt");
var validator = require('validator');
require('dotenv').config();
const { RESPONSE } = require("../../config/global")
const { send } = require("../../config/responseHelper")

const { initAdminModel } = require("../../model/AdminModel");


const registerAdmin = async (req, res) => {
    try {
        const { adminname, email, password } = req.body;
        const val = validator.isEmail(req.body.email);
        const Admin = await initAdminModel();

        if (!adminname) {
            return send(res, RESPONSE.ERROR, { message: "admin name is mandatory" });
        }
        if (!email) {
            return send(res, RESPONSE.ERROR, "email is mandatory");
        }
        if (!password) {
            return send(res, RESPONSE.ERROR, "password is mandatory");
        }
        if (!val) {
            return send(res, RESPONSE.ERROR, "invalid email");
        }

        const adminAvailable = await Admin.findOne({ where: { email: email } });
        if (adminAvailable) {
            return send(res, RESPONSE.ERROR, "admin already exists");
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            adminname,
            email,
            password: hashpassword,

        });
        return send(res, RESPONSE.SUCCESS, "Admin created successfully");

    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message)


    }


};
//=======================================================================



module.exports = { registerAdmin };