const { Schema, model } = require("mongoose");

// Defines the schema for the flight document
const flightSchema = new Schema({
    UserId:{type: Schema.Types.ObjectId, required: true},
    Altitude: { type: Number, required: true, min: 0, max: 3000}, // Altitude of the flight (minimum value 0)
    His: { type: Number, required: true, min: 0, max: 360 }, // His of the flight (minimum value 0, maximum value 360)
    ADI: { type: Number, required: true, min: 0, max: 100 }, // ADI of the flight (minimum value 0, maximum value 100)
}, { timestamps: true }); // Adds createdAt and updatedAt fields to the document

// Creates the flight model based on the flightSchema
const Flight = model("Flight", flightSchema);

module.exports = Flight;
