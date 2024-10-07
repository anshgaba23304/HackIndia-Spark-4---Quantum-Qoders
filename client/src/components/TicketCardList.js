import React from 'react';
import TicketCard from './TicketCard';

const TicketCardList = () => {
  // Example data
  const event = {
    name: 'Concert',
    date: '2024-10-10',
    price: '50',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  };

  return (
    <div className="flex justify-center p-4">
      <TicketCard 
        eventName={event.name} 
        eventDate={event.date} 
        ticketPrice={event.price} 
        imageUrl={event.image} 
      />
    </div>
  );
};

export default TicketCardList;
