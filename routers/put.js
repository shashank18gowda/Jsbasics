const express = require("express")
const router = express.Router()



const schema = require("../models/schema")
router.put('/:id', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
     
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

        const check = await schema.findOne({ _id: req.params.id, stat: true });

        if (!check) {
            return res.send("User not found or doesn't have stat=true");
        }

        if (updateUserList.name) {
            check.name = updateUserList.name;
        }

        if (updateUserList.email) {
            check.email = updateUserList.email;
        }
        
        if (updateUserList.phone) {
            check.phone = updateUserList.phone;
        }
  // const data = new schema({
        //     name:name,
        //     regNo:regNo,
        //     mat_stat:mat_stat
        // })

        // check.mat_stat =req.body.mat_stat
        // check.name =req.body.name

        // check.regNo =req.body.regNo

        //  await check.save()
        //  return res.send("data updated")

        await check.save();
        return res.send("Data updated");
    } catch (err) {
        return res.status(500).send("Error: " + err);
    }
});

module.exports = router
