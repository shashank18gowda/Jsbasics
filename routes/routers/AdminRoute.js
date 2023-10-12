
const express = require("express");
const router = express.Router();
const { registerAdmin} = require("../Admin/adminReg");
const { loginAdmin} = require("../Admin/adminLogin");
const { currentAdmin} = require("../Admin/adminCurrent");
// const { forgotPassword,resetPassword} = require("./PassManagement");



const {validateToken} = require("../../middleware/jwtToken"); 


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/current", validateToken, currentAdmin);


// router.post('/forgot',forgotPassword);

// router.post('/reset/:token/:email', resetPassword);



module.exports = router;
