const { initCustModel } = require("../../model/customerModel");
const { RESPONSE } = require("../../config/global");
const express = require("express")
const router = express.Router()
const { send } = require("../../config/responseHelper")


// @access private
const getCust = async (req, res) => {
    try {
        const schema = await initCustModel();
        const check = await schema.findAll({ where: { stat: true } });

        if (check.length === 0) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }
        return send(res, RESPONSE.SUCCESS, { check })
    } catch (err) {
        return send(res, RESPONSE.ERROR, err.stack)
    }
};

const getCustID = async (req, res) => {
    try {
        const schema = await initCustModel();
        const check = await schema.findOne({
            where: {
                id: req.params.id,
                stat: true,
            }
        });

        if (!check) {
            return send(res, RESPONSE.ENTRY_NF);
        }

        return send(res, RESPONSE.SUCCESS, check);

    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);
    }
};
module.exports = { getCust, getCustID }
