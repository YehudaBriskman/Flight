import React, { useContext, useState } from 'react';
import Loading from '../shared/Loading';
import { useForm } from 'react-hook-form';
import { getAxiosStatus } from '../utils/utils';
import { URLS, Network } from '../Routes/NetworkService';
import FlightCard from './FlightCard';
import userContext from './context/userContext';
import { useNavigate } from 'react-router-dom';

const FlightSearch = () => {
    const { user } = useContext(userContext);
    const [response, setResponse] = useState(null);
    const [searchType, setSearchType] = useState("ADI");
    const maxValue = {
        ADI: 100,
        His: 360,
        Altitude: 3000
    };

    const getUserIdFromLocalStorage = () => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return parsedData._id;
        }
        return null;
    };

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const nav = useNavigate();

    const search = async (data) => {
        const searchObject = {
            ADI: { url: URLS.FIND_BY_ADI, body: { ADI: data.ADI } },
            His: { url: URLS.FIND_BY_HIS, body: { His: data.His } },
            Altitude: { url: URLS.FIND_BY_ALTITUDE, body: { Altitude: data.Altitude } }
        };
        const currentSearchType = searchType || 'ADI';
        const requestData = searchObject[currentSearchType];
        let userId = getUserIdFromLocalStorage();
        if (!userId && user) {
            userId = user._id;
        }
        if (!user && !getUserIdFromLocalStorage()) {
            nav("/nouser");
            return null;
        }
        const newData = {
            ...requestData.body,
            UserId: userId
        };
        console.log(newData);
        try {
            const response = await Network.post(requestData.url, newData);
            setResponse(response.data);
        } catch (error) {
            console.error(getAxiosStatus(error) + ": ", error);
            setError("error", { message: "network error" });
        }
    };

    // JSX code for rendering the flight search form and displaying search results
    return (
        <div className='pb-5'>
            <Loading on={isSubmitting} /> {/* Displaying a loading spinner while submitting the form */}
            <div className="max-w-sm mx-auto mt-8 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg">
                <form onSubmit={handleSubmit(search)} className=" shadow-md rounded px-8 pt-6 pb-3 mb-4 items-center">
                    <div className='w-full text-center'><h1 className='text-black font-medium text-3xl pb-2'>Search Flight</h1></div>
                    <div className="mb-2 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <div className='flex justify-between items-center p-2'>
                            <label className="ps-1 block text-gray-700 text-sm font-bold ">
                                Search By
                            </label>
                            <div className='text-gray-700 font-bold'>
                                when >
                                <select
                                    style={{ border: "0px" }}
                                    onChange={(e) => setSearchType(e.target.value)} // Setting the search type based on user selection
                                    className="bg-transparent border border-black pr-1 focus:border-none focus:outline-none cursor-pointer"
                                >
                                    <option value="ADI">ADI</option>
                                    <option value="Altitude">Altitude</option>
                                    <option value="His">His</option>
                                </select>
                            </div>
                        </div>
                        {/* Conditional rendering based on the selected search type */}
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none hover:border-none"
                            {...register(searchType, {
                                valueAsNumber: true,
                                type: "number",
                                required: true,
                                validate: (value) => {
                                    if (value < 0) return "ADI must be Minimum 0";
                                    if (value > maxValue[searchType]) return "ADI can't reach 100";
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-8 mb-1 text-center'>
                        {errors.ADI && <span className='text-xs text-red-700'>{errors.ADI.message}</span>}
                        {errors.His && <span className='text-xs text-red-700'>{errors.His.message}</span>}
                        {errors.Altitude && <span className='text-xs text-red-700'>{errors.Altitude.message}</span>}
                    </div>
                    <div className="mb-2 pb-2 text-center w-full">
                        <button type="submit" className="bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                            Done
                        </button>
                    </div>
                    {errors.error && <span className='text-red-600'>{errors.error.message}</span>} {/* Displaying network error message */}
                </form>
            </div>
            {/* Displaying flight search results */}
            {response &&
                <div className='flex flex-row flex-wrap justify-center md:max-w-[90%] p-3 mx-auto'>
                    {response.map((flight, index) => (
                        <div key={index}>
                            <FlightCard flight={flight} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default FlightSearch;
