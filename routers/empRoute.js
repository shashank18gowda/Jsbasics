// routers/userRoute.js
const express = require("express");
const router = express.Router();
const { createEmp } = require("./crud/post");
const { getEmpId  } = require("./crud/getEmpId");
const { getEmp } = require("./crud/getEmp");

const { getImg  } = require("./crud/getImg");
const { deleteEmp } = require("./crud/delete");
const { updateEmp } = require("./crud/put");
const { searchEmp } = require("./crud/getSearch");
const upload = require('../middleware/upload');
const validateToken = require("../middleware/validateTokenHandler"); // Import the middleware


router.post("/createEmp", validateToken,upload.array('image',1),createEmp);
router.get("/getEmp/:id",validateToken, getEmpId);
router.get("/getEmp/",validateToken, getEmp);

router.get("/getImg/:key", getImg);

router.delete("/deleteEmp/:id",validateToken, deleteEmp);
router.put("/updateEmp/:id",validateToken, updateEmp);
router.get("/searchEmp/:key",validateToken, searchEmp);

module.exports = router;
