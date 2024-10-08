import React from 'react';

const TicketCard = ({ eventName, eventDate, ticketPrice, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 mb-4 border border-gray-200 dark:border-gray-600">
      <img
        src={imageUrl || "https://via.placeholder.com/300"}
        alt={eventName}
        className="h-48 w-full object-cover"
      />
      
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Event Name */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
            {eventName}
          </h3>

          {/* Event Date and Ticket Price */}
          <div className="flex justify-between items-center w-full text-gray-500 dark:text-gray-400">
            <span className="text-sm">{eventDate}</span>
            <span className="bg-teal-100 dark:bg-teal-100 text-teal-800 p-1 rounded-md">
              {ticketPrice} Polygon
            </span>
          </div>

          <hr className="border-gray-200 dark:border-gray-600" />

          {/* Buy Ticket Button */}
          <button
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transform hover:translate-y-1 transition duration-300"
            aria-label={`Buy ticket for ${eventName}`}
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
