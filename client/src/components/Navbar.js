import React, { useState } from 'react';
import { ethers } from 'ethers';

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false); // Track wallet connection state

  const POLYGON_AMOY_TESTNET_ID = '80002'; // Replace with your correct testnet chain ID

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (isConnecting) {
        console.log('Wallet connection already in progress. Please wait.');
        return; // Prevent multiple requests
      }
  
      setIsConnecting(true); // Start connection process
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Check if accounts already granted permissions
        const accounts = await provider.send('eth_accounts', []);
        if (accounts.length > 0) {
          // Wallet already connected
          const address = accounts[0];
          console.log('Already connected to wallet:', address);
          setWalletAddress(address);
          setIsConnecting(false);
          return;
        }
  
        // If no accounts yet, request connection
        await provider.send('eth_requestAccounts', []); // MetaMask connection request
        const signer = await provider.getSigner();
        const address = signer.address; // Directly access the address property
  
        // Check if the correct network is selected
        const network = await provider.getNetwork();
        if (network.chainId !== parseInt(POLYGON_AMOY_TESTNET_ID, 16)) {
          alert('Please switch to the Polygon Amoy Testnet.');
          return;
        }
  
        console.log('Connected to wallet:', address);
        setWalletAddress(address); // Set connected wallet address
  
      } catch (err) {
        if (err.code === -32002) {
          console.error('MetaMask connection request already pending. Please wait.');
          alert('MetaMask request is already pending. Please wait and try again.');
        } else {
          console.error('Error connecting wallet:', err);
        }
      } finally {
        setIsConnecting(false); // Reset the state after the connection attempt
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };

  return (
    <nav className="bg-teal-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">Tixy</h1>
      <div>
        <button
          onClick={connectWallet}
          disabled={isConnecting} // Disable button when connecting
          className={`bg-white/70 text-teal-800 px-4 py-2 rounded-md text-md hover:bg-white/90 ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {walletAddress
            ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
            : isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
