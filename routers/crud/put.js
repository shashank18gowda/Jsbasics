const express = require("express")
const router = express.Router()
const validateToken = require("../../middleware/validateTokenHandler");


const {send} = require("../../helper/responseHelper")
const {initEmpModel} = require("../../models/EmpModel");
const { RESPONSE } = require("../../config/global");
//@access private
const updateEmp = async (req, res) => {
  //  try {
        // const { name, email, phone } = req.body;
     
        // const updateUserList = {};

        // if (req.body.name) {
        //     updateUserList.name = req.body.name;
        // }
             
        // if (req.body.email) {
        //     updateUserList.email = req.body.email;
        // }
        
        // if (req.body.phone) {
        //     updateUserList.phone = req.body.phone;
        // }

        // const check = await schema.findOne({ _id: req.params.id, stat: true });
        // if (!check) {
        //     return res.send("User not found or doesn't have stat=true");
        // }

        // if (updateUserList.name) {
        //     check.name = updateUserList.name;
        // }

        // if (updateUserList.email) {
        //     check.email = updateUserList.email;
        // }
        
        // if (updateUserList.phone) {
        //     check.phone = updateUserList.phone;
        // }
  
//         await check.save();
//         return res.send("Data updated");
//     } catch (err) {
//         return res.status(500).send("Error: " + err);
//     }
// });
try {
    const { name, email, phone } = req.body;
    const id = req.params.id;

    const schema = await initEmpModel();
    console.log(schema)
    const check = await schema.findOne({where:{ id: id, user_id: req.user.id, stat: true }});

    if (!check) {
       return send(res,RESPONSE.USER_NOT_PERMITTED);

    }

  
    const updateUserList = {};

    if (name) {
        updateUserList.name = name;
    }

    if (email) {
        updateUserList.email = email;
    }

    if (phone) {
        updateUserList.phone = phone;
    }

    
    const updatedItem = await schema.update(updateUserList,
       {where: { id: id, user_id: req.user.id, stat: true },
                returning: true }
    );

    if (!updatedItem) {
        return send(res,RESPONSE.ITM_NOT_FOUND);
    }

    return send(res,RESPONSE.D_UPDATED_SUCCESS);

} catch (err) {
    return send(res,RESPONSE.ERROR,err.message);

}
};

module.exports = {updateEmp}
