    const express = require("express")
const router = express.Router();
const multer = require("multer")
const {validateToken} = require("../../middleware/jwtToken")
const {checkAdminRole,checkUserRole,checkUserAdmin} = require("../../middleware/checkRole")


const { createFood } = require("../Food/createFood")
const {getFood,getFoodCat} = require("../Food/listFood")
const {updateFood} = require("../Food/updateFood")
const {searchFood} = require("../Food/searchFood")
const {deleteFood} = require("../Food/deleteFood")
const { rating,getRating,getRatingByUser } = require("../CRWC/rating")
const upload = require("../../middleware/upload");
const { comment , getComment} = require("../CRWC/comment");
const { addWishList , getwishListByUser} = require("../CRWC/wishlist");

router.post('/create',upload.array('image',1),validateToken,checkAdminRole,createFood)
//router.get('/list',validateToken,checkUserAdmin,getFood)
router.get('/list/:Food_id',validateToken,checkUserRole,getFood)
router.get('/list/:category',validateToken,checkUserRole,getFoodCat)

router.put('/update/:Food_id',upload.array('image',1),validateToken,checkAdminRole,updateFood)
router.get('/search/:key',validateToken,checkUserAdmin,searchFood)              //both need search option
router.delete('/delete/:Food_id',validateToken,checkAdminRole,deleteFood)

router.post('/rating/:Food_id',validateToken,checkUserRole,rating)
router.get('/rating/:Food_id',validateToken,checkUserAdmin,getRating)
router.get('/ratingByUser/:user_id',validateToken,checkUserAdmin,getRatingByUser)
 
router.post('/comment/:Food_id',validateToken,checkUserRole,comment)
router.get('/comment/:Food_id',validateToken,checkUserRole,getComment)

router.post('/wishlist/:Food_id',validateToken,checkUserRole,addWishList)


//router.get('/wishlistByUser/:Food_id',validateToken,getwishListByUser)

module.exports = router;    





