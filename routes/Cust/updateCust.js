const express = require("express")
const router = express.Router()
var validator = require('validator');
const moment = require("moment");

const { send } = require("../../config/responseHelper")
const { initCustModel } = require("../../model/customerModel");
const { RESPONSE } = require("../../config/global");
//@access private
const updateCust = async (req, res) => {

    try {
        const { F_name, L_name, email, phone, dob, acc_num } = req.body;
        const id = req.params.id;

        const Cust = await initCustModel();

        // console.log(Cust)
        const check = await Cust.findOne({ where: { id: id, stat: true } });

        if (!check) {
            return send(res, RESPONSE.ENTRY_NF);

        }

        const updateUserList = {};

        if (F_name) {
            updateUserList.F_name = F_name;
        }
        if (L_name) {
            updateUserList.L_name = L_name;
        }
        if (email) {
            const existingEntryEmail = await Cust.findOne({ where: { email: email } });
            const val = validator.isEmail(req.body.email);

            if (existingEntryEmail) {
                return send(res, RESPONSE.EMAIL_ALREADY_EXIST);
            }
            if (!email || email == "" || !val) {
                return send(res, RESPONSE.NO_EMAIL);
            }
            updateUserList.email = email;
        }

        if (phone) {
            const existingEntryphone = await Cust.findOne({ where: { phone: phone } });
            const ph = validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10

            if (existingEntryphone) {
                return send(res, RESPONSE.PHONE_ALREADY_EXIST);
            }
            if (!ph == true) {
                return send(res, RESPONSE.PHONE_INVALID);
            }
            updateUserList.phone = phone;
        }


        if (dob) {
            if (!moment(dob, 'DD-MM-YYYY', true).isValid()) {
                return send(res, RESPONSE.INVALID_DATE_FORMAT);
            }
            updateUserList.dob = dob;
        }


        if (acc_num) {
            const accountNumberRegex = /^\d{14}$/;
            if (!accountNumberRegex.test(acc_num)) {
                return send(res, RESPONSE.ACCOUNT_NUM);
            }
            updateUserList.acc_num = acc_num;
        }

        const updatedItem = await Cust.update(updateUserList,
            {
                where: { id: id, stat: true },
                returning: true
            }
        );

        if (!updatedItem) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }

        return send(res, RESPONSE.D_UPDATED_SUCCESS);

    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);

    }
};

module.exports = { updateCust }
