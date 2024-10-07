import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap">
          {/* Branding Section */}
          <h1 className="text-2xl font-bold tracking-wider">Tixy Ticketing</h1>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="https://twitter.com/" aria-label="Twitter" className="text-teal-400 hover:text-teal-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com/" aria-label="Facebook" className="text-teal-400 hover:text-teal-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://instagram.com/" aria-label="Instagram" className="text-teal-400 hover:text-teal-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com/" aria-label="LinkedIn" className="text-teal-400 hover:text-teal-300">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 flex-wrap mb-4">
          <a href="/about" className="text-white text-sm hover:underline">
            About Us
          </a>
          <a href="/events" className="text-white text-sm hover:underline">
            Events
          </a>
          <a href="/contact" className="text-white text-sm hover:underline">
            Contact
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Tixy Ticketing. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
