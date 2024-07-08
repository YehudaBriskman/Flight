import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes/AppRoutes';
import flightContext from './Components/context/flightContext';
import userContext from './Components/context/userContext';

function App() {
  // State to manage fly data
  const [flightData, setFlightData] = useState({});
  const [user, setUser] = useState(null)

  // Effect to log changes in flightData
  useEffect(() => {
    console.log("flightData: ", flightData);
  }, [flightData]);
  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser
      }}>
      <flightContext.Provider value={{//check if the local storage is available in the Incognito (anonimos)
        flightData,
        setFlightData
      }}>
        {/* Root BrowserRouter component for routing */}
        <BrowserRouter>
          {/* Rendering AppRoutes for defining routes */}
          <AppRoutes />
        </BrowserRouter>
      </flightContext.Provider>
    </userContext.Provider>
  );
}

export default App;
