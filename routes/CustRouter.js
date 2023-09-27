const express = require("express")
const router = express.Router();
const { createCust} = require("./Cust/createCust")
const {getCust,getCustID} = require("./Cust/listCust")
const {updateCust} = require("./Cust/updateCust")
const {searchCust} = require("./Cust/searchCust")
const {deleteCust} = require("./Cust/deleteCust")

router.post('/create',createCust)
router.get('/list',getCust)
router.get('/list/:id',getCustID)
router.put('/update/:id',updateCust)
router.get('/search/:key',searchCust)
router.delete('/delete/:id',deleteCust)


module.exports = router;





