import React, { useContext, useEffect, useState } from 'react'
import flightContext from './context/flightContext';
import TextView from './TextView';
import VisualView from './VisualView';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const VisualFlight = () => {
    // Initialize state variables and context
    const { flightData } = useContext(flightContext)
    const [_, setSky] = useState(flightData.ADI);
    const [__, setArrow] = useState(flightData.His)
    const [___, setAltitudeArrow] = useState(flightData.Altitude)
    const [showFlightData, setShowFlyData] = useState(false);
    const nav = useNavigate()

    // Update state variables when flightData changes
    useEffect(() => {
        setSky(flightData.ADI);
    }, [flightData.ADI]);
    useEffect(() => {
        setArrow(flightData.His);
    }, [flightData.His]);
    useEffect(() => {
        setAltitudeArrow(flightData.Altitude);
    }, [flightData.Altitude]);

    return (
        <div className='pb-5 max-w-7xl mx-auto'>
            <div className='w-full flex justify-center'>
                <button className='m-3 mb-10 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline' onClick={() => setShowFlyData(true)}>Text</button>
                <button className='m-3 mb-10 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline' onClick={() => setShowFlyData(false)}>Visual</button>
                <button className='m-3 mb-10 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline' onClick={() => nav("/flightDetails")}><FaPlus /></button>
            </div>
            {/* Conditionally render TextView or VisualView based on showFlightData state */}
            {showFlightData && (
                <TextView />
            )}
            {!showFlightData && (
                <VisualView />
            )}
        </div >
    )
}

export default VisualFlight
