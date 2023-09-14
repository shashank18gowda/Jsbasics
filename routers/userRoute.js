
const express = require("express");
const router = express.Router();
const { registerUser} = require("./UserReg");
const { loginUser} = require("./UserLog");
const { currentUser} = require("./UserCurrent");

const validateToken = require("../middleware/validateTokenHandler"); 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser); 



module.exports = router;
