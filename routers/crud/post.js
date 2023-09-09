const express = require("express")

var validator = require('validator');
const validateToken = require("../../middleware/validateTokenHandler");

const { send } = require("../../helper/responseHelper")
// const { initEmpModel } = require("../models/EmpModel");
const { initUserModel } = require("../../models/userModel");
const { RESPONSE } = require("../../config/global");
const { initEmpModel } = require("../../models/EmpModel");
//@access private

const createEmp = async (req, res) => {
    try {
        const Emp = await initEmpModel();
        const User = await initUserModel();

        console.log(req.user.id);

        // if (!Emp) {
        //     return res.status(500).send('Emp model is undefined'); // or handle the error in an appropriate way
        // }

        const { name, email, phone } = req.body;

        const existingEntryEmail = await Emp.findOne({ where: { email: email } });
        const existingEntryphone = await Emp.findOne({ where: { phone: phone } });

        // const data = new initEmpModel({
        //     user_id: req.user.id,
        //     name: name,
        //     email: email,
        //     phone: phone

        // })

        const val = validator.isEmail(req.body.email);
        const ph = validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10
        //     const val2 = validator.isEmpty(req.body.email);    
        // const userModel = await initEmpModel();

        // console.log(val2);


        if (!name) {
            return send(res, RESPONSE.NO_NAME);
        }

        // if (!isEmpty(email)) {
        //     return res.send('Please provide an email');
        // }

        if (!phone) {
            return send(res, RESPONSE.NO_PHONE);

        }
        // if(validator.isEmpty(val2)){
        //     errors.name ='email field is required';
        // }

        if (!email || email == "" || !val) {
            return send(res, RESPONSE.NO_EMAIL);

        }

        // if(){
        //     return res.send("email undefined")
        // }

        if (existingEntryEmail) {
            return send(res, RESPONSE.EMAIL_ALREADY_EXIST);

        }


        if (existingEntryphone) {
            return send(res, RESPONSE.PHONE_ALREADY_EXIST);

        }

        //if ( validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10){
        if (!ph == true) {
            return send(res, RESPONSE.PHONE_INVALID);

        }
        await Emp.create({
           
            name: name,
            email: email,
            phone: phone,
            user_id: req.user.id
        });
        // await data.save()
        //return res.status(200).send(emp)
        return send(res, RESPONSE.D_INSERT_SUCCESS);

    } catch (err) {
        console.error(err.message);
        return res.send(err.message);
    }


}
module.exports = {createEmp}
