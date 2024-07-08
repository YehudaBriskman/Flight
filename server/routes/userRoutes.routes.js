const router = require("express").Router(); // Importing Express Router
const userCtrl = require("../controllers/userController");
const { auth } = require("../middleware/auth");

// Define routes for user authentication
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/user", auth, userCtrl.getUserInfo);
router.post("/logout",auth, userCtrl.logout);

module.exports = router;
