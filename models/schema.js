const mongoose = require("mongoose")
const validator = require("../authentication/emailAuth");
const getSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                try {
                    return validator.isEmail(value);
                } catch (error) {
                    return res.send("invalid email")
                }
            }
        }
    },

    regNo: {
        type: Number,
        require: true
    },
    mat_stat: {
        type: Boolean,
        require: true,
        default: false
    }
})
module.exports = mongoose.model('getUser', getSchema)
