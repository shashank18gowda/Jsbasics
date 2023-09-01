const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler");
const Image = require('../models/imagemodel');


const schema = require("../models/schema")
// @access private
router.get("/", validateToken, async (req, res) => {
    try {
        const check = await schema.find({ user_id: req.user.id });

        const filteredItems = check.filter(item => item.stat === true);

        if (filteredItems.length === 0) {
            return res.send("No items found");
        }

        res.json(filteredItems);
    } catch (err) {
        res.status(500).send("Error: " + err);
    }
});

// @access private
router.get("/:id", validateToken, async (req, res) => {
    try {
        const check = await schema.findOne({
            _id: req.params.id,
            user_id: req.user.id,
            stat: true,
        });

        if (!check) {
            return res.send("Entry not found or doesn't belong to the user");
        }

        res.json(check);
    } catch (err) {
        res.status(500).send("Error: " + err);
    }
});
module.exports = router
