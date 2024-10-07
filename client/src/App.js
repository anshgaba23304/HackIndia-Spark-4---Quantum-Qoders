import React, { useState } from 'react';
import { ethers } from 'ethers';
import TixyTicket from './contract/TixyTicket.json';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MintTicketForm from './components/MintTicketForm';
import TicketCardList from './components/TicketCardList';

const contractAddress = "0xDcC9B2BE80667b57c2133C8A4442ECd49E63452d";

function App() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ticketURI, setTicketURI] = useState('');
    const [tickets, setTickets] = useState([]); // For storing minted tickets

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const account = signer.address; // No need for getAddress() in v6
    
                setCurrentAccount(account);
                alert(`Wallet connected: ${account}`);
            } catch (error) {
                console.error("Error connecting to MetaMask: ", error);
                alert('Failed to connect to wallet.');
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const mintTicket = async ({ eventName, ticketPrice, eventDescription, numberOfTickets }) => {
        if (!currentAccount) {
            alert('Please connect your wallet first!');
            return;
        }

        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, TixyTicket.abi, signer);

        try {
            // Construct ticketURI from form data
            const ticketData = {
                name: eventName,
                description: eventDescription,
                price: ticketPrice,
                tickets: numberOfTickets
            };
            const ticketURI = `data:application/json;base64,${btoa(JSON.stringify(ticketData))}`;

            const transaction = await contract.mintTicket(currentAccount, ticketURI);
            await transaction.wait();
            alert('Ticket minted successfully!');

            // Update ticket list with new minted ticket
            setTickets([...tickets, { uri: ticketURI }]);
            setTicketURI(''); // Clear the form after minting
        } catch (error) {
            console.error('Error minting ticket:', error);
            alert('Failed to mint ticket.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar connectWallet={connectWallet} currentAccount={currentAccount} />
            <HeroSection connectWallet={connectWallet} currentAccount={currentAccount} />
            <MintTicketForm
                onMint={mintTicket} // Pass mintTicket as onMint
                loading={loading}
            />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <TicketCardList tickets={tickets} />
            </div>
            <Footer />
        </div>
    );
}

export default App;