import React from 'react';
import FlightCard from './FlightCard';

const FlightsDashForWarnOk = ({ flights, onClose }) => {
  if (!Array.isArray(flights)) {
    return <p>No flights available</p>;
  }

  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-start bg-gray-200 bg-opacity-50 z-50">
      <div className=" md:max-w-[90%] w-full p-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-lg relative m-4">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-row flex-wrap justify-center md:max-w-[90%] mx-auto">
          {flights.map((flight, index) => (
            <div key={index}>
              <FlightCard flight={flight} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightsDashForWarnOk;
