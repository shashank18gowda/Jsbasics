const express = require("express")
const router = express.Router()
const schema = require("../models/schema")
const validateToken = require("../middleware/validateTokenHandler");

//@access private

router.delete("/:id", validateToken, async (req, res) => {
    try {
        const itemId = req.params.id;

       
        const itemToDelete = await schema.findOne({ _id: itemId, user_id: req.user.id, stat: true });

        if (!itemToDelete) {
            return res.send("Item not found or you are not permitted to delete this details.");
        }

        const updatedItem = await schema.findOneAndUpdate(
            { _id: itemId, user_id: req.user.id, stat: true },
            { stat: false },
            { new: true }
        );

        if (!updatedItem) {
            return res.send("Item not found"); 
        }

        return res.send("Data deleted successfully.");
    } catch (err) {
        return res.status(500).send("Error: " + err);
    }
});

module.exports = router
