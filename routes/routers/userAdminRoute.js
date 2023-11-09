const express = require("express")
const router = express.Router();

const { validateToken } = require("../../middleware/jwtToken")
const {  checkUserAdmin } = require("../../middleware/checkRole")




const { searchFood } = require("../Food/searchFood")
const { getRating, getRatingByUser } = require("../CRWC/rating")


//router.get('/list',validateToken,checkUserAdmin,getFood)

router.get('/search/:key', validateToken, checkUserAdmin, searchFood)              //both need search option
router.get('/rating/:Food_id', validateToken, checkUserAdmin, getRating)
router.get('/ratingByUser/:user_id', validateToken, checkUserAdmin, getRatingByUser)




module.exports = router;





