
const express = require("express");
const router = express.Router();

const { validateToken } = require("../../middleware/jwtToken");
const { registerUser } = require("../User/userReg");
const { loginUser } = require("../User/userLogin");
const { currentUser } = require("../User/userCurrent");
const { addAddress } = require("../Food/addAddress");
const { checkUserRole } = require("../../middleware/checkRole");
const { getUser } = require("../User/listUser");
const { addcart, getCart } = require("../CRWC/cart");
const { placeOrder, paymentMethod } = require("../CRWC/placeOrder");
const { forgotPassword } = require("../passwordManagement/forgotPass");
const { checkOTP } = require("../passwordManagement/checkOTP");
const { resetPassword } = require("../passwordManagement/resetPass");
const { comment, getComment } = require("../CRWC/comment");
const { addWishList, getwishListByUser } = require("../CRWC/wishlist");
const { getFood, getFoodCat } = require("../Food/listFood");
const { rating } = require("../CRWC/rating");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

router.post('/address/', validateToken, checkUserRole, addAddress)

router.get('/getUser', validateToken, checkUserRole, getUser)

router.post('/forgot', forgotPassword);
router.post('/checkOTP', checkOTP);

router.post('/reset/', resetPassword);

router.get('/list/:Food_id', validateToken, checkUserRole, getFood)
router.get('/list/:category', validateToken, checkUserRole, getFoodCat)
router.post('/addToCart/:Food_id', validateToken, checkUserRole, addcart)
router.get('/getCart/', validateToken, checkUserRole, getCart)
router.post('/rating/:Food_id', validateToken, checkUserRole, rating)
router.post('/comment/:Food_id', validateToken, checkUserRole, comment)
router.get('/comment/:Food_id', validateToken, checkUserRole, getComment)
router.post('/wishlist/:Food_id', validateToken, checkUserRole, addWishList)



router.get('/placeOrder/', validateToken, checkUserRole, placeOrder)
router.get('/paymentMethod/', validateToken, checkUserRole, paymentMethod)







module.exports = router;
