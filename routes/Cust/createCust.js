const express = require("express")

var validator = require('validator');

const { send } = require("../../config/responseHelper")
const { RESPONSE } = require("../../config/global");
const { initCustModel } = require("../../model/customerModel");
const moment = require("moment");
const createCust = async (req, res) => {
    try {
        const Cust = await initCustModel();
        const { F_name, L_name, email, phone, dob, acc_num } = req.body;
        const existingEntryEmail = await Cust.findOne({ where: { email: email } });
        const existingEntryphone = await Cust.findOne({ where: { phone: phone } });
        const existingEntryac = await Cust.findOne({ where: { acc_num: acc_num } });


        const val = validator.isEmail(req.body.email);
        const ph = validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10

        if (!moment(dob, 'DD-MM-YYYY', true).isValid()) {
            return send(res, RESPONSE.INVALID_DATE_FORMAT);
        }
        if (!F_name) {
            return send(res, RESPONSE.F_NAME);
        }
        if (!L_name) {
            return send(res, RESPONSE.L_NAME);
        }
        if (!phone) {
            return send(res, RESPONSE.NO_PHONE);
        }
        if (!dob) {
            return send(res, RESPONSE.DATE);
        }
       
        const accountNumberRegex = /^\d{14}$/;
        if (!accountNumberRegex.test(acc_num)) {
            return send(res, RESPONSE.ACCOUNT_NUM);
        }
        if (!email || email == "" || !val) {
            return send(res, RESPONSE.NO_EMAIL);
        }
        if (existingEntryEmail) {
            return send(res, RESPONSE.EMAIL_ALREADY_EXIST);
        }
        if (existingEntryphone) {
            return send(res, RESPONSE.PHONE_ALREADY_EXIST);
        }
        if (existingEntryac) {
            return send(res, RESPONSE.ACC_ALREADY_EXIST);
        }
        if (!ph == true) {
            return send(res, RESPONSE.PHONE_INVALID);
        }
        await Cust.create({
            F_name: F_name,
            L_name: L_name,
            email: email,
            phone: phone,
            dob: dob,
            acc_num: acc_num
        });

        return send(res, RESPONSE.D_INSERT_SUCCESS);

    } catch (err) {
        console.error(err.stack);
        return send(res, RESPONSE.ERROR,err.stack);
    }
}
module.exports = { createCust }
