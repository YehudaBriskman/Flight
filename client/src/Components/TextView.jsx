import React, { useContext, useEffect, useState } from 'react'
import flightContext from './context/flightContext';
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

const TextView = () => {
    // Initialize state variables and context
    const { flightData } = useContext(flightContext);
    const [sky, setSky] = useState(flightData.ADI);
    const [arrow, setArrow] = useState(flightData.His)
    const [AltitudeArrow, setAltitudeArrow] = useState(flightData.Altitude)
    const [_, setLoadedFromLocalStorage] = useState(false);
    // State to manage the copied status
    const [copied, setCopied] = useState(false);

    // Function to handle copying flight details
    const copyHandler = () => {
        // Copy flight details to clipboard
        copyFlightDetails();
        // Set copied status to true
        setCopied(true);
        // Reset copied status after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    // Function to copy flight details to clipboard
    const copyFlightDetails = () => {
        // Construct flight details string
        const flightDetails = `ADI: ${arrow}\nAltitude: ${AltitudeArrow}\nHis: ${sky}`;
        // Copy flight details to clipboard
        navigator.clipboard.writeText(flightDetails);
    };

    // Update state variables when flightData changes
    useEffect(() => {
        // Check if flightData exists in local storage
        const storedFlightData = JSON.parse(localStorage.getItem('LS-FlightData'));
        if (storedFlightData) {
            // Update flightData context with data from local storage
            setLoadedFromLocalStorage(true);
            console.log(storedFlightData);
            setSky(storedFlightData.ADI);
            setArrow(storedFlightData.His);
            setAltitudeArrow(storedFlightData.Altitude);
        }
        else {
            setSky(flightData.ADI);
            setArrow(flightData.His);
            setAltitudeArrow(flightData.Altitude);
        }
    }, []);

    return (
        <div className="max-w-sm mx-auto mt-8 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg">
            <div className='shadow-md rounded px-8 pt-6 pb-5 mb-4 items-center'>
                <div className='flex justify-between px-2 items-center mb-4'>
                    <h2 className="text-lg font-semibold">Flight Details</h2>
                    {/* Render copy icon if details are not copied */}
                    {!copied && <LuCopy className='cursor-pointer' onClick={copyHandler} />}
                    {/* Render checkmark icon if details are copied */}
                    {copied && <LuCopyCheck className='cursor-pointer' />}
                </div>
                <div className='p-4 m-2 border-b-2 border-gray-600 rounded-lg shadow-md flex justify-between'>
                    <p className='text-lg font-semibold'>Altitude</p>
                    <p className='text-xl'>{AltitudeArrow >= 0 && AltitudeArrow <= 3000 ? AltitudeArrow : "No Data"}</p>
                </div>
                <div className='p-4 m-2 border-b-2 border-gray-600 rounded-lg shadow-md flex justify-between'>
                    <p className='text-lg font-semibold'>HIS</p>
                    <p className='text-xl'>{arrow >= 0 && arrow <= 3000 ? arrow : "No Data"}</p>
                </div>
                <div className='p-4 m-2 border-b-2 border-gray-600 rounded-lg shadow-md flex justify-between'>
                    <p className='text-lg font-semibold'>AID</p>
                    <p className='text-xl'>{sky >= 0 && sky <= 3000 ? sky : "No Data"}</p>
                </div>
            </div>
        </div>


    )
}

export default TextView
