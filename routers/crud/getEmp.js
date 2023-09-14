const { initEmpModel } = require("../../models/EmpModel");
const { RESPONSE } = require("../../config/global");
const express = require("express")
const router = express.Router()
const { send } = require("../../helper/responseHelper")
const { getFileFromS3 } = require("../../utils/s3");
const validateToken = require("../../middleware/validateTokenHandler");

const getEmp = async (req, res) => {
    try {
        const schema = await initEmpModel();

        const employee = await schema.findAll({
            where: {
                stat: true,
                user_id: req.user.id,
            }
        });
        if (employee.length === 0) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }


        const employeesWithImages = await Promise.all(
            employee.map(async (item) => {
                //    const Key = req.params.id;
                const imageKey = item.imageKey;
                // const imageStream = getFileFromS3(Key);
                const url = "https://"
                return {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    // image: item.image,
                    image: `/emp/getImg/${imageKey}`,
                };
            })
        );

        
        return send(res, RESPONSE.SUCCESS, {Employee_Details: employeesWithImages})
    } catch (err) {
        console.log(err.message);
        return send(res, RESPONSE.ERROR);
    }
};
module.exports = { getEmp }