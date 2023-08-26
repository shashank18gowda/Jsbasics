const express = require("express")
const router = express.Router()
const schema = require("../models/schema")

router.delete('/:id', async (req, res) => {
    try {
        const { name, email, phone, stat } = req.body;
        const itemId = req.params.id;

        const data = new schema({

            name: name,
            email: email,
            phone: phone,
            stat: stat
        })

        const updatedItem = await schema.findByIdAndUpdate(itemId,
            { stat: false },
            { new: true }
        );

        if (!updatedItem) {
            return res.send("Item not found");
        }

        res.send("data deleted");

    } catch (err) {
        res.send("Error: " + err);
    }
});
module.exports = router
