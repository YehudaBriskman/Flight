import axios from 'axios';

// Define the base URL for Axios
const BASE_URL = "http://localhost:3001/";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;


function get(url) {
    return axios.get(url);
};

function post(url, data) {
    return axios.post(url, data);
};

export const URLS = {
    REGISTER:"user/register",
    LOGIN: "user/login",
    LOGOUT: "user/logout",
    GET_USER: "user/user",
    REGISTER_FLIGHT_URL: "flight/addFlight",
    FIND_BY_ALTITUDE: "flight/searchFlightByAltitude",
    FIND_BY_ADI: "flight/searchFlightByADI",
    FIND_BY_HIS: "flight/searchFlightByHis",
    ALL_FLIGHTS: "flight/getAllFlights",
}

export const Network = {
    get: get,
    post: post,
}