import React, { useState } from 'react';
import { ethers } from 'ethers';
import TixyTicket from './contract/TixyTicket.json';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TicketCard from './components/TicketCard';
import MintTicketForm from './components/MintTicketForm';

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
            <div className="flex justify-center flex-wrap mt-8">
                <TicketCard
                    title="Concert Ticket"
                    imageSrc="https://b.zmtcdn.com/data/zomaland/1972f38023c561f25b5c96e0b99cad471725427050.png?fit=around%7C600%3A600"
                    description="Join us for an unforgettable night!"
                />
                <TicketCard
                    title="Festival Pass"
                    imageSrc="https://b.zmtcdn.com/data/zomaland/598208eb93184b88270c8c55b97291811725427062.png?fit=around%7C600%3A600"
                    description="Get your pass for the biggest festival of the year!"
                />
            </div>
            <Footer />
        </div>
    );
}

export default App;
