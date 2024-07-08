const mongoose = require('mongoose');

// Connects to MongoDB using the provided URL
const mongoConnect = async (url) => {
    console.log("Connecting to MongoDB");
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

module.exports = mongoConnect;
