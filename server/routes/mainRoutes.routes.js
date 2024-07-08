const errorHandler = require('../middleware/errorHandler');
const router = require("express").Router();
const flyRoutes = require("./flightRoutes.routes");
const userRoutes = require("./userRoutes.routes");
require("dotenv").config();

router.use("/flight", flyRoutes); // Mounting fly routes under /fly prefix
router.use("/user", userRoutes); // Mounting user routes under /user

// Error handler middleware
router.use(errorHandler);

module.exports = router; // Exporting the router
