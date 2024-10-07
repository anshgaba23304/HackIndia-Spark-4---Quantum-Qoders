import React, { useState } from 'react';
import { Box, Flex, Button, HStack, Text, IconButton, Collapse, useDisclosure } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const { isOpen, onToggle } = useDisclosure(); // Chakra's useDisclosure for better control
    const POLYGON_MAINNET_ID = '0x89';
    const POLYGON_MUMBAI_TESTNET_ID = '0x13881';

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
        <Box
            bgGradient="linear(to-r, teal.400, teal.600)" // Gradient background
            px={4}
            py={4}
            shadow="md"
            position="fixed"
            width="100%"
            zIndex="10"
        >
            <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    Tixy
                </Text>
                <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                    <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.300' }} _focus={{ outline: 'none' }}>
                        Home
                    </Button>
                    <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.300' }} _focus={{ outline: 'none' }}>
                        Events
                    </Button>
                    <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.300' }} _focus={{ outline: 'none' }}>
                        About Us
                    </Button>
                    <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.300' }} _focus={{ outline: 'none' }}>
                        Contact
                    </Button>
                </HStack>

                <IconButton
                    aria-label="Toggle Navigation"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    variant="outline"
                    color="white"
                    display={{ md: 'none' }}
                    onClick={onToggle}
                />

                <Button
                    onClick={connectWallet}
                    colorScheme="whiteAlpha"
                    variant="solid"
                    size="md"
                    bg="whiteAlpha.700"
                    color="teal.800"
                    _hover={{ bg: 'whiteAlpha.900' }}
                    _focus={{ outline: 'none' }}
                >
                    {walletAddress
                        ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                        : 'Connect Wallet'}
                </Button>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Flex
                    direction="column"
                    bg="teal.600"
                    display={{ md: 'none' }}
                    px={4}
                    py={2}
                    rounded="md"
                    mt={4}
                    shadow="md"
                >
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        _focus={{ outline: 'none' }}
                        onClick={onToggle}
                    >
                        Home
                    </Button>
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        _focus={{ outline: 'none' }}
                        onClick={onToggle}
                    >
                        Events
                    </Button>
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        _focus={{ outline: 'none' }}
                        onClick={onToggle}
                    >
                        About Us
                    </Button>
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        _focus={{ outline: 'none' }}
                        onClick={onToggle}
                    >
                        Contact
                    </Button>
                </Flex>
            </Collapse>
        </Box>
    );
};

export default Navbar;
