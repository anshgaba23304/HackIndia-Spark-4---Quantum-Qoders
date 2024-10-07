import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}>
      {/* Optional Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="flex flex-col items-center justify-center h-full relative px-4">
        {/* Hero Content */}
        <div className="flex flex-col items-center space-y-8 max-w-3xl mt-10">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-center tracking-wide uppercase shadow-lg">
            Experience the Future of Ticketing
          </h1>

          <p className="text-white text-lg md:text-xl lg:text-2xl text-center opacity-90 shadow-lg">
            Tixy is a decentralized, secure, and fraud-proof NFT-based ticketing platform. Buy, sell, and manage your event tickets with ease and security.
          </p>

          {/* Call to Action Button */}
          <button
            className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-400 rounded transition duration-300"
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            Get Started <FaArrowDown className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
