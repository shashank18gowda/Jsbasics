const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler");



const schema = require("../models/schema")
//@access private
router.put("/:id", validateToken, async (req, res) => {
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
    const itemId = req.params.id;

    
    const check = await schema.findOne({ _id: itemId, user_id: req.user.id, stat: true });

    if (!check) {
        return res.send("You are not permitted to change this details.");
    }

  
    const updateUserList = {};

    if (req.body.name) {
        updateUserList.name = req.body.name;
    }

    if (req.body.email) {
        updateUserList.email = req.body.email;
    }

    if (req.body.phone) {
        updateUserList.phone = req.body.phone;
    }

    
    const updatedItem = await schema.findOneAndUpdate(
        { _id: itemId, user_id: req.user.id, stat: true },
        updateUserList,
        { new: true }
    );

    if (!updatedItem) {
        return res.send("not found");
    }

    return res.send("Data updated successfully.");
} catch (err) {
    return res.status(500).send("Error: " + err);
}
});

module.exports = router
