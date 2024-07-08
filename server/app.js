const express = require("express");
require("dotenv").config();
const mainRouter = require("./routes/mainRoutes.routes");
const cors = require("cors");
const mongoConnect= require("./DB/mongoConnect");

const app = express();

// Connecting to MongoDB
mongoConnect(process.env.MONGO_URI);

// Parsing JSON requests
app.use(express.json());

// Configuring CORS middleware
app.use(cors({
    origin: process.env.URLS.split(";"), // Allowed origins
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"], // Allowed HTTP methods
    credentials: true, // Allowing credentials
}));

// Using the main router
app.use(mainRouter);

// Starting the server
app.listen(
    process.env.PORT, // Port number
    () => console.log("server listening on port " + process.env.PORT) // Logging server startup message
);
