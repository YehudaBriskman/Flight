import React, { useContext } from 'react';
import Loading from '../shared/Loading';
import { useForm } from 'react-hook-form';
import flightContext from './context/flightContext';
import { useNavigate } from 'react-router-dom';
import { Network, URLS } from '../Routes/NetworkService';
import { getAxiosStatus } from '../utils/utils';
import userContext from './context/userContext';

const FlightDetails = () => {
    const { user } = useContext(userContext);
    const { flightData, setFlightData } = useContext(flightContext);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const nav = useNavigate();

    const getUserIdFromLocalStorage = () => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return parsedData._id;
        }
        return null;
    };

    const signup = async (data) => {
        if (user === null) {
            console.log("User is null");
        }
        if (getUserIdFromLocalStorage() === null) {
            console.log("UserId from localStorage is null");
        }
        let userId = getUserIdFromLocalStorage();
        if (!userId && user) {
            userId = user._id;
        }
        data = { ...data, UserId: userId };
        const detailsUpdate = data;
        console.log("update: ", detailsUpdate);
        setFlightData({ ...flightData, ...detailsUpdate }); // Update flyData with the new details
        localStorage.setItem("LS-FlightData", JSON.stringify(data)); // Store the fly data in local storage
        try {
            await Network.post(URLS.REGISTER_FLIGHT_URL, data); // Send data to server for registration
            nav("/visualFlight"); // Navigate to visualFly page upon successful registration
        } catch (error) {
            console.log(getAxiosStatus(error) + ": ", error);
            setError("error", { message: "network error" }); // Set error for network issues
        }
    };

    if (!user && !getUserIdFromLocalStorage()) {
        nav("/nouser");
        return null;
    }

    return (
        <div className='pb-5'>
            {/* Displaying loading indicator */}
            <Loading on={isSubmitting} />
            {/* Form for submitting fly data */}
            <div className="max-w-sm mx-auto mt-8 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg">
                <form onSubmit={handleSubmit(signup)} className=" shadow-md rounded px-8 pt-6 pb-3 mb-4 items-center">
                    <div className='w-full text-center'><h1 className='text-black font-medium text-3xl pb-2'>Start Flight</h1></div>
                    {/* Altitude input */}
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <label className="ps-1 block text-gray-700 text-sm font-bold ">
                            Altitude (0-3000)
                        </label>
                        <input
                            type='number'
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                            {...register("Altitude", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "Altitude must be Minimum 0"
                                    if ((value > 3000)) return "Altitude can't reach 3000"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.Altitude && <span className='text-xs text-red-700'>{errors.Altitude.message}</span>}</div>
                    {/* His input */}
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <label className="ps-1 block text-gray-700 text-sm font-bold ">
                            His (0-360)
                        </label>
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                            {...register("His", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "His must be Minimum 0"
                                    if ((value > 360)) return "His can't reach 360"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.His && <span className='text-xs text-red-700'>{errors.His.message}</span>}</div>
                    {/* ADI input */}
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <label className="ps-1 block text-gray-700 text-sm font-bold ">
                            ADI (0-100)
                        </label>
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                            {...register("ADI", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "ADI must be Minimum 0"
                                    if ((value > 100)) return "ADI can't reach 100"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.ADI && <span className='text-xs text-red-700'>{errors.ADI.message}</span>}</div>
                    {/* Submit button */}
                    <div className="mb-2 pb-2 text-center w-full">
                        <button type="submit" className="bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                            Done
                        </button>
                    </div>
                    {/* Displaying error message if any */}
                    {errors.error && <span className='text-red-600'>{errors.error.message}</span>}
                </form>
            </div>
        </div>
    );
};

export default FlightDetails;
