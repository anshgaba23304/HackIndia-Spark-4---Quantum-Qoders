import React, { useState } from 'react';

const MintTicketForm = ({ onMint }) => {
  const [eventName, setEventName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !ticketPrice || !eventDescription || !numberOfTickets) {
      alert("Please fill in all fields");
      return;
    }

    setIsMinting(true);
    try {
      // Call the onMint function with event data
      await onMint({ eventName, ticketPrice, eventDescription, numberOfTickets });
      alert("Tickets minted successfully!");
      clearForm();
    } catch (error) {
      alert(error.message || "An error occurred while minting tickets.");
    } finally {
      setIsMinting(false);
    }
  };

  const clearForm = () => {
    setEventName('');
    setTicketPrice('');
    setEventDescription('');
    setNumberOfTickets('');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto mt-12 bg-gray-50 border border-gray-200 shadow-2xl rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Mint Event Tickets
        </h2>

        <div className="flex flex-col space-y-6">
          {/* Event Name */}
          <div className="flex flex-col">
            <label htmlFor="eventName" className="text-teal-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Ticket Price */}
          <div className="flex flex-col">
            <label htmlFor="ticketPrice" className="text-teal-700 mb-1">
              Ticket Price (Poly)
            </label>
            <input
              type="number"
              id="ticketPrice"
              placeholder="Enter ticket price in Poly"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Event Description */}
          <div className="flex flex-col">
            <label htmlFor="eventDescription" className="text-teal-700 mb-1">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              placeholder="Enter event description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            ></textarea>
          </div>

          {/* Number of Tickets */}
          <div className="flex flex-col">
            <label htmlFor="numberOfTickets" className="text-teal-700 mb-1">
              Number of Tickets
            </label>
            <input
              type="number"
              id="numberOfTickets"
              placeholder="Enter number of tickets"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`p-3 w-full bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-300 ${isMinting && 'opacity-50 cursor-not-allowed'}`}
            disabled={isMinting}
          >
            {isMinting ? 'Minting...' : 'Mint Tickets'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MintTicketForm;
