const { Schema, model } = require("mongoose");

// Define the schema for the User document
const userSchema = new Schema({
    name: { type: String, required: true, minLength: 6, maxLength: 16 },
    email: { type: String, required: true, minLength: 8, maxLength: 40, unique: true },
    password: { type: String, required: true, minLength: 6, maxLength: 999 },
}, { timestamps: true });

// Create the User model based on the userSchema
const User = model("User", userSchema);

module.exports = User;
