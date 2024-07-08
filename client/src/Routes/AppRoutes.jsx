import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import FlightSearch from '../Components/FlightsSearch'
import FlightDetails from '../Components/FlightDetails'
import VisualFlight from '../Components/VisualFlight'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'


// Define the AppRoutes component
const AppRoutes = () => {
    return (
        <Routes>
            {/* Define routes inside the Navbar */}
            <Route path='/' element={<Navbar />}>
                {/* Define route for the home page */}
                <Route path='/' element={<Home />} />
                <Route path='/searchFlights' element={<FlightSearch />}/>
                {/* Define route for fly details page */}
                <Route path='/flightDetails' element={<FlightDetails/>} />
                {/* Define route for visual fly page */}
                <Route path='/visualFlight' element={<VisualFlight/>} />
                {/* Define route for 404 not found page */}
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<h1 className='text-4xl'>404 not found</h1>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
