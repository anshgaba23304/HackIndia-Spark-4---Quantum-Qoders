import React, { useState } from 'react';
import { ethers } from 'ethers';

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const POLYGON_MAINNET_ID = '0x89';
    const POLYGON_MUMBAI_TESTNET_ID = '0x13881';

    const toggleMenu = () => setIsOpen(!isOpen);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                const { chainId } = await provider.getNetwork();
                if (chainId !== POLYGON_MAINNET_ID && chainId !== POLYGON_MUMBAI_TESTNET_ID) {
                    alert('Please switch to the Polygon network.');
                    return;
                }

                setWalletAddress(address);
            } catch (err) {
                console.error('Error connecting wallet:', err);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature!');
        }
    };

    return (
        <nav className="bg-gradient-to-r from-teal-400 to-teal-600 px-4 py-4 shadow-md fixed w-full z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
                <div className="text-2xl font-bold text-white">Tixy</div>

                <div className="hidden md:flex space-x-6">
                    <button className="text-white hover:bg-white/30 px-3 py-2 rounded">Home</button>
                    <button className="text-white hover:bg-white/30 px-3 py-2 rounded">Events</button>
                    <button className="text-white hover:bg-white/30 px-3 py-2 rounded">About Us</button>
                    <button className="text-white hover:bg-white/30 px-3 py-2 rounded">Contact</button>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Wallet Connect Button */}
                <button
                    onClick={connectWallet}
                    className="bg-white/70 text-teal-800 px-4 py-2 rounded-md text-md hover:bg-white/90"
                >
                    {walletAddress
                        ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                        : 'Connect Wallet'}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4 bg-teal-600 rounded-md shadow-md`}>
                <div className="px-4 py-2">
                    <button className="block text-white hover:bg-white/30 w-full text-left py-2" onClick={toggleMenu}>Home</button>
                    <button className="block text-white hover:bg-white/30 w-full text-left py-2" onClick={toggleMenu}>Events</button>
                    <button className="block text-white hover:bg-white/30 w-full text-left py-2" onClick={toggleMenu}>About Us</button>
                    <button className="block text-white hover:bg-white/30 w-full text-left py-2" onClick={toggleMenu}>Contact</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
