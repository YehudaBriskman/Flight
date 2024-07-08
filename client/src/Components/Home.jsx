import React, { useState, useEffect, useContext } from 'react';
import { Network, URLS } from '../Routes/NetworkService';
import { getAxiosStatus } from '../utils/utils';
import FlightsDashForWarnOk from './FlightsDashForWarnOk';
import userContext from './context/userContext';

const Home = () => {
  const { user } = useContext(userContext);
  const [flights, setFlights] = useState([]);
  const [warningFlightsCount, setWarningFlightsCount] = useState(0);
  const [okFlightsCount, setOkFlightsCount] = useState(0);
  const [okFlights, setOkFlights] = useState([]);
  const [warnFlights, setWarnFlights] = useState([]);
  const [isDash1Open, setIsDash1Open] = useState(false);
  const [isDash2Open, setIsDash2Open] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // בדיקה האם קיים משתמש ב-LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getUserIdFromLocalStorage = () => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData._id;
    }
    return null;
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        let userId = getUserIdFromLocalStorage();
        if (!userId && user) {
          userId = user._id;
        }
        const response = await Network.post(URLS.ALL_FLIGHTS, { UserId: userId });
        const allFlights = response.data;
        const warnFlights = allFlights.filter(flight => (
          parseInt(flight.Altitude) <= 300 || parseInt(flight.Altitude) >= 2700 ||
          parseInt(flight.ADI) <= 10 || parseInt(flight.ADI) >= 90
        ));
        const warnFlightsIds = warnFlights.map(flight => flight._id);
        const okFlights = allFlights.filter(flight => !warnFlightsIds.includes(flight._id));

        setWarnFlights(warnFlights);
        setFlights(allFlights);
        setOkFlights(okFlights);
        setWarningFlightsCount(warnFlights.length);
        setOkFlightsCount(okFlights.length);
      } catch (error) {
        console.error(getAxiosStatus(error) + ": ", error);
      }
    };

    fetchFlights();

    const interval = setInterval(() => {
      fetchFlights();
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center text-black h-full flex-col pb-6">
        <div className="text-center max-w-md mx-auto p-6 pb-3 bg-gradient-to-r from-slate-300 to-slate-500 rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome to our application!</h1>
          <p className="text-lg font-semibold text-center text-gray-800 mb-4">For starting, please log-in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center text-black h-full flex-col pb-6">
      <div className="text-center max-w-md mx-auto p-6 pb-3 bg-gradient-to-r from-slate-300 to-slate-500 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome back to Flights!</h1>

        <div className="text-center my-4 mx-2 py-5 px-3 relative bg-gradient-to-r from-slate-200 to-slate-400 rounded-xl border border-black shadow-lg">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Total Flights Status:
          </div>
          <div className="flex items-center justify-center">
            <div
              className="w-52 h-52 rounded-full flex items-center justify-center border-black border shadow-2xl"
              style={{
                background: `conic-gradient( 
                  #ff0000 ${((warningFlightsCount / flights.length) * 100).toFixed(2)}%, 
                  #00ff00 ${((warningFlightsCount / flights.length) * 100).toFixed(2)}%
                )`
              }}
            >
              {flights.length > 0 ?
                <div className="text-2xl font-semibold text-gray-800">
                  {(100 - (warningFlightsCount / flights.length) * 100).toFixed(2)}%
                </div>
                :
                <div className="text-2xl font-semibold text-gray-800">
                  No Data
                </div>
              }
            </div>
          </div>
          <div className="text-center mt-4 flex justify-around">
            <div
              onClick={() => setIsDash1Open(!isDash1Open)}
              className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-red-700 rounded-lg shadow-lg shadow-red-700 text-center cursor-pointer flex items-center justify-center"
            >
              Warning Flights: {warningFlightsCount}
            </div>
            <div
              onClick={() => setIsDash2Open(!isDash2Open)}
              className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-green-700 rounded-lg shadow-lg shadow-green-700 text-center cursor-pointer flex items-center justify-center"
            >
              Ok Flights: {okFlightsCount}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a href="/flightDetails" className="m-3 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">Add More Flights</a>
        </div>
      </div>

      {(isDash1Open && warningFlightsCount > 0) && <FlightsDashForWarnOk flights={warnFlights} onClose={() => setIsDash1Open(false)} />}
      {(isDash2Open && okFlightsCount > 0) && <FlightsDashForWarnOk flights={okFlights} onClose={() => setIsDash2Open(false)} />}
    </div>
  );
};

export default Home;
