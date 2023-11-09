
const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../Admin/adminReg");
const { loginAdmin } = require("../Admin/adminLogin");
const { currentAdmin } = require("../Admin/adminCurrent");
const { validateToken } = require("../../middleware/jwtToken");
const { deleteFood } = require("../Food/deleteFood")
const { updateFood } = require("../Food/updateFood")
const { createFood } = require("../Food/createFood")
const multer = require("multer")
const upload = require("../../middleware/upload");
const { checkAdminRole } = require("../../middleware/checkRole");
const { getAllOrderList, getOrderListByStatus, updateOrderStat } = require("../CRWC/manageOrderStat");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/current", validateToken, currentAdmin);

router.post('/create', upload.array('image', 1), validateToken, checkAdminRole, createFood)
router.put('/update/:Food_id', upload.array('image', 1), validateToken, checkAdminRole, updateFood)
router.delete('/delete/:Food_id', validateToken, checkAdminRole, deleteFood)

router.get('/allOders',validateToken, checkAdminRole,getAllOrderList )
router.get('/orderByStat/:order_status',validateToken, checkAdminRole,getOrderListByStatus )
router.put('/editStatus/:orderId',validateToken, checkAdminRole,updateOrderStat )


module.exports = router;
