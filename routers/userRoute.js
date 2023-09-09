// routers/userRoute.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler"); // Import the middleware

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser); // Apply validateToken middleware here




module.exports = router;
