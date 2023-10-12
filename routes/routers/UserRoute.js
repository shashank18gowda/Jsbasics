
const express = require("express");
const router = express.Router();

const {validateToken} = require("../../middleware/jwtToken"); 
const { registerUser } = require("../User/userReg");
const { loginUser } = require("../User/userLogin");
const { currentUser } = require("../User/userCurrent");
const {createAdress} = require("../Food/address");
const { checkUserRole } = require("../../middleware/checkRole");
const { getuser } = require("../User/listUser");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

router.post('/address/',validateToken,checkUserRole,createAdress)
router.get('/getUser',validateToken,checkUserRole,getuser)

// router.post('/forgot',forgotPassword);

// router.post('/reset/:token/:email', resetPassword);



module.exports = router;
