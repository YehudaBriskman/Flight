const Flight = require("../models/flightModel");

const getFlights = async (UserId) => {
    const flights = await Flight.find({ UserId: UserId });
    return flights;
};

const getFlightsByHis = async (UserId, His) => {
    const flights = await Flight.find({ UserId: UserId, His: {$gt: His} });
    return flights;
};

const getFlightsByADI = async (UserId, ADI) => {
    const flights = await Flight.find({ UserId: UserId, ADI: {$gt: ADI} });
    return flights;
};

const getFlightsByAltitude = async (UserId, Altitude) => {
    const flights = await Flight.find({ UserId: UserId, Altitude: {$gt: Altitude} });
    return flights;
};

const addFlight = async ( flightData) => {
    const flight = new Flight({ ...flightData});
    console.log({flight});
    const savedFlight = await flight.save();
    return savedFlight;
};

const flightService = {
    getFlights,
    getFlightsByHis,
    getFlightsByAltitude,
    getFlightsByADI,
    addFlight
};

module.exports = flightService;
