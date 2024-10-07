import React, { useState } from 'react';
import { ethers } from 'ethers';
import TixyTicket from './contract/TixyTicket.json';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
//import TicketCard from './components/TicketCard';
import MintTicketForm from './components/MintTicketForm';
import TicketCardList from './components/TicketCardList';
const contractAddress = "0xDcC9B2BE80667b57c2133C8A4442ECd49E63452d";

function App() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ticketURI, setTicketURI] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setCurrentAccount(accounts[0]);
                alert(`Wallet connected: ${accounts[0]}`);
            } catch (error) {
                console.error("Error connecting to MetaMask: ", error);
                alert('Failed to connect to wallet.');
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const mintTicket = async () => {
        if (!currentAccount) {
            alert('Please connect your wallet first!');
            return;
        }

        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, TixyTicket.abi, signer);

        try {
            const transaction = await contract.mintTicket(currentAccount, ticketURI);
            await transaction.wait();
            alert('Ticket minted successfully!');
        } catch (error) {
            console.error('Error minting ticket:', error);
            alert('Failed to mint ticket.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <HeroSection connectWallet={connectWallet} currentAccount={currentAccount} />
            <MintTicketForm
                ticketURI={ticketURI}
                setTicketURI={setTicketURI}
                mintTicket={mintTicket}
                loading={loading}
            />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <TicketCardList />
            </div>
            <Footer />
        </div>
    );
}

export default App;
