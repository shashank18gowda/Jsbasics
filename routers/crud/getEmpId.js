const {initEmpModel} = require("../../models/EmpModel");
const { RESPONSE } = require("../../config/global");
const express = require("express")
const router = express.Router()
const {send }=require("../../helper/responseHelper")
const { getFileFromS3 } = require("../../utils/s3");
const validateToken = require("../../middleware/validateTokenHandler");

// @access private
const getEmpId = async (req, res) => {
    try {

        const schema= await initEmpModel();
        const key = req.params.key;

       console.log(key);
     //   console.log(req.user.id);
        const check = await schema.findAll({where:{ id: req.params.id ,user_id: req.user.id }});
      
      
        const filteredItems = check.filter(item => item.stat === true);

        if (filteredItems.length === 0) {
            return send(res, RESPONSE.ITM_NOT_FOUND);
        }


        const employeesWithImages = await Promise.all(
            filteredItems.map(async (item) => {
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
                   image:`/emp/getImg/${imageKey}`,
                };
            })
        );
        return send(res, RESPONSE.SUCCESS, {Employee_Details: employeesWithImages});
    //    res.status(200).json(employeesWithImages);
    } catch (err) {
        return send(res, RESPONSE.ERROR, err.message);
    }
};

module.exports = { getEmpId };

