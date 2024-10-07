import React from 'react';
import TicketCard from './TicketCard';

const TicketCardList = () => {
  // Example data for multiple events
  const events = [
    {
      name: 'Concert',
      date: '2024-10-10',
      price: '50',
      image: 'https://via.placeholder.com/300', // Replace with actual image URL
    },
    {
      name: 'Art Exhibition',
      date: '2024-11-05',
      price: '25',
      image: 'https://via.placeholder.com/300',
    },
    {
      name: 'Tech Conference',
      date: '2024-12-15',
      price: '100',
      image: 'https://via.placeholder.com/300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {events.map((event, index) => (
        <TicketCard
          key={index}
          eventName={event.name}
          eventDate={event.date}
          ticketPrice={event.price}
          imageUrl={event.image}
        />
      ))}
    </div>
  );
};

export default TicketCardList;
