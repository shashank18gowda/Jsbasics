const express = require("express")
const router = express.Router()

const Image = require('../models/imagemodel');


const schema = require("../models/schema")

router.get('/', async (req, res) => {
    try {
        const { name, email, phone, stat } = req.body;
        const check = await schema.find({ stat: 1 })
        res.json(check)
    } catch (err) {
        res.send("Error" + err.stack)
    }

})
//get by id operation
router.get('/:id', async (req, res) => {
    try {

        const check = await schema.findOne({ _id: req.params.id, stat: true });

        if (!check) {
            return res.send("User does not exist or has been deleted");
        }

        res.json(check);
    } catch (err) {
        res.send("Error: " + err);
    }
});
module.exports = router
