
const express = require("express");
const router = express.Router();

const {validateToken} = require("../../middleware/jwtToken"); 
const { registerUser } = require("../User/userReg");
const { loginUser } = require("../User/userLogin");
const { currentUser } = require("../User/userCurrent");
const {addAddress} = require("../Food/addAddress");
const { checkUserRole } = require("../../middleware/checkRole");
const { getUser } = require("../User/listUser");
const { addcart, getCart} = require("../CRWC/cart");
const { placeOrder, paymentMethod } = require("../CRWC/placeOrder");
const { forgotPassword } = require("../passwordManagement/forgotPass");
const { checkOTP } = require("../passwordManagement/checkOTP");
const { resetPassword } = require("../passwordManagement/resetPass");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

router.post('/address/',validateToken,checkUserRole,addAddress)

router.get('/getUser',validateToken,checkUserRole,getUser)

router.post('/forgot',validateToken,checkUserRole,forgotPassword);
router.post('/checkOTP',validateToken,checkUserRole,checkOTP);

router.post('/reset/',validateToken,checkUserRole, resetPassword);


router.post('/addToCart/:Food_id',validateToken,checkUserRole,addcart)
 router.get('/getCart/',validateToken,checkUserRole,getCart)

 router.get('/placeOrder/',validateToken,checkUserRole,placeOrder)
 router.get('/paymentMethod/',validateToken,checkUserRole,paymentMethod)






module.exports = router;
