// routers/userRoute.js
const express = require("express");
const router = express.Router();
const { createEmp } = require("./crud/post");
const { getEmp , getEmpID } = require("./crud/get");
const { deleteEmp } = require("./crud/delete");
const { updateEmp } = require("./crud/put");
const { searchEmp } = require("./crud/getSearch");

const validateToken = require("../middleware/validateTokenHandler"); // Import the middleware


router.post("/createEmp", validateToken,createEmp);
router.get("/getEmp",validateToken, getEmp);
router.get("/getEmpID/:id",validateToken, getEmpID);

router.delete("/deleteEmp/:id",validateToken, deleteEmp);
router.put("/updateEmp/:id",validateToken, updateEmp);
router.get("/searchEmp/:key",validateToken, searchEmp);

module.exports = router;
