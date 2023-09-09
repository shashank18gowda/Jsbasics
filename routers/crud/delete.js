const express = require("express")
const router = express.Router()
const {initEmpModel} = require("../../models/EmpModel")
const validateToken = require("../../middleware/validateTokenHandler");
const { RESPONSE } = require("../../helper/responseHelper");
const {send} = require("../../helper/responseHelper")
//@access private

const deleteEmp = async (req, res) => {
    try {
        const {id} = req.params;
const schema =await initEmpModel();
console.log(schema);
       
        const itemToDelete = await schema.findOne({ where : { id: id, user_id: req.user.id, stat: true }});

        if (!itemToDelete) {
            return send(res,RESPONSE.ITM_NOT_FOUND_OR_USER_NOT_PERMITTED);
        }

        const updatedItem = await schema.updatedItempdate(
          { stat: false },
          {where:  { id: id, user_id: req.user.id, stat: true },
           
            returning: true }
        );

        if (!updatedItem) {
          return send(res,RESPONSE.ITM_NOT_FOUND);
        }

      return send(res, RESPONSE.DATA_DELETED_SUCCESSFULLY);
    } catch (err) {
     // return send(res, RESPONSE.ERROR);
     return res.send(err.stack)
    }
};

module.exports = {deleteEmp}
