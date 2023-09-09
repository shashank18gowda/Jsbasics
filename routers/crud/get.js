const {initEmpModel} = require("../../models/EmpModel");
const { RESPONSE } = require("../../config/global");
const express = require("express")
const router = express.Router()
const {send }=require("../../helper/responseHelper")

const validateToken = require("../../middleware/validateTokenHandler");

// @access private
const getEmp = async (req, res) => {
    try {

        const schema= await initEmpModel();
        console.log(schema);
        console.log(req.user.id);
        const check = await schema.findAll({where:{ user_id: req.user.id }});
 
      
        const filteredItems = check.filter(item => item.stat === true);

        if (filteredItems.length === 0) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }

        res.status(200).json(filteredItems);
    } catch (err) {
        return send(res, RESPONSE.ERROR,err.stack);
    }
};

// @access private
const getEmpID = async (req, res) => {
    try {
        const schema= await initEmpModel();

        const check = await schema.findOne({where:{
            id: req.params.id,
            user_id: req.user.id,
            stat: true,
        }});

        if (!check) {
            return send(res, RESPONSE.ENTRY_NF_OR_NOT_PERMITTED_THIS_USER);        }

        res.status(200).json(check);

    } catch (err) {
            return send(res, RESPONSE.ERROR,err.stack);
    }
};
module.exports = {getEmp,getEmpID}
