import React, { useContext, useEffect, useState } from 'react'
import { CgArrowLongUp } from 'react-icons/cg';
import flightContext from './context/flightContext';


const VisualView = () => {
    // Initialize state variables and context
    const { flightData } = useContext(flightContext);
    const [sky, setSky] = useState(flightData.ADI);
    const [arrow, setArrow] = useState(flightData.His)
    const [AltitudeArrow, setAltitudeArrow] = useState(flightData.Altitude)
    const [_, setLoadedFromLocalStorage] = useState(false);

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
        else{
            setSky(flightData.ADI);
            setArrow(flightData.His);
            setAltitudeArrow(flightData.Altitude);
        }
    }, []);

    return (
        // Displaying a section with three components arranged in a flex layout
        <div className='flex items-center flex-wrap justify-around select-none'>
            {/* Displaying a container with a gradient background and altitude indicator */}
            <div className='border-2 border-black rounded-full p-7 bg-gradient-to-b from-slate-400 via-slate-100 to-slate-400 shadow-xl mb-4 overflow-hidden relative'>
                {/* Checking if the altitude value is within the valid range */}
                {AltitudeArrow >= 0 && AltitudeArrow <= 3000 ?
                    <div className='h-[420px] w-[160px] relative'>
                        {/* Displaying tick marks indicating altitude levels */}
                        <ul className='flex flex-col items-center h-full'>
                            <li className=''>3000</li>
                            {Array.from({ length: 6 }, (_, i) => (
                                <li key={i} className='mt-[42px]'>{2500 - i * 500}</li>
                            ))}

                        </ul>
                        <div
                            // Applying flexbox style with horizontal center alignment, maximum width, and left margin of 50%
                            className='flex justify-center w-full ml-[50%] duration-700 '
                            style={{
                                position: 'absolute',
                                // Moving the div to the bottom of the screen with the height dependent on the AltitudeArrow value, plus 7 pixels
                                bottom: `${(396 / 3000) * AltitudeArrow + 7}px`,
                                transform: 'translate(-50%, -50%)',
                                overflow: 'hidden'
                            }}>
                            {AltitudeArrow > 2700 || AltitudeArrow < 500 ?
                                <>
                                    <div className='duration-700 w-14 h-1 bg-red-700 border border-black mr-7 rounded-full'></div>
                                    <div className='duration-700 w-14 h-1 bg-red-700 border border-black ml-7 rounded-full'></div>
                                </>
                                :
                                <>
                                    <div className='duration-700 w-14 h-1 bg-green-500 border border-black mr-7 rounded-full'></div>
                                    <div className='duration-700 w-14 h-1 bg-green-500 border border-black ml-7 rounded-full'></div>
                                </>
                            }
                        </div>

                    </div>
                    :
                    // If altitude data is unavailable, display "No Data"
                    <div className='text-center items-center justify-center flex font-serif text-xl my-4 h-[420px] w-[160px]'>
                        <div>No Data</div>
                    </div>
                }
            </div>

            {/* Displaying a container with a rotating arrow */}
            <div style={{
                transform: `rotate(-${arrow}deg)`
            }}
                className='m-5 py-5 sm:h-[350px] sm:w-[350px] h-[250px] w-[250px] select-none rounded-full border border-black shadow-xl bg-gradient-to-b from-slate-50 via-slate-400 to-slate-50 duration-700'>
                {/* Checking if the arrow data is unavailable */}
                {arrow == undefined ?
                    // If arrow data is unavailable, display "No Data"
                    <div className='h-full text-center items-center justify-center flex font-serif text-xl'>
                        <div>No Data</div>
                    </div> :
                    // If arrow data is available, display the rotating arrow
                    <ul>
                        <li style={{ transform: `rotate(${arrow}deg)`, transformOrigin: 'center center' }} className='w-9 h-9 text-center pt-[5px] bg-slate-400 rounded-full border border-black mx-auto'>0</li>
                        <div className='flex justify-between items-center sm:mt-[86px] mt-[36px] px-5' style={{ transformOrigin: 'center center' }}>
                            <li style={{ transform: `rotate(${arrow}deg)`, transformOrigin: 'center center' }} className='w-9 h-9 text-center pt-[5px] bg-slate-400 rounded-full border border-black'>270</li>
                            <div>
                                <CgArrowLongUp style={{ transform: `rotate(${arrow}deg)`, transformOrigin: 'center center' }} size="4rem" color="black" />
                            </div>
                            <li style={{ transform: `rotate(${arrow}deg)`, transformOrigin: 'center center' }} className='w-9 h-9 text-center pt-[5px] bg-slate-400 rounded-full border border-black'>90</li>
                        </div>
                        <li style={{ transform: `rotate(${arrow}deg)`, transformOrigin: 'center center' }} className='w-9 h-9 text-center pt-[5px] sm:mt-[86px] mt-[36px] bg-slate-400 rounded-full border border-black mx-auto'>180</li>
                    </ul>
                }
            </div>

            {/* Displaying a container with altitude and sky percentage */}
            <div className={`ADI overflow-hidden my-5 sm:h-[350px] sm:w-[350px] h-[250px] w-[250px]  rounded-full border border-black text-gray-800 shadow-xl`}>
                <div className='h-full'>
                    {/* Checking if sky data is unavailable */}
                    {sky == undefined && <div className='h-full bg-slate-300 text-center items-center justify-center flex font-serif text-xl'>
                        <div>No Data</div>
                    </div>}
                    {/* Displaying sky and ground percentages */}
                    <div className='bg-blue-600 text-center items-center justify-center flex' style={{ height: `${sky}%` }}>
                        {sky >= 50 && <div>Sky: {sky}%</div>}
                    </div>
                    <div className='bg-green-600 text-center items-center justify-center flex border-t-2 border-black' style={{ height: `${100 - sky}%` }}>
                        {(100 - sky) >= 50 && <div>Ground: {100 - sky}%</div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VisualView
