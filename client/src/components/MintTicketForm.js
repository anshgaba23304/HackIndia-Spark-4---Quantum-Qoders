import React, { useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Textarea,
  Text,
} from '@chakra-ui/react';

const MintTicketForm = ({ onMint }) => {
  const [eventName, setEventName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !ticketPrice || !eventDescription || !numberOfTickets) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsMinting(true);
    try {
      // Call the onMint function with event data
      await onMint({ eventName, ticketPrice, eventDescription, numberOfTickets });
      toast({
        title: "Success",
        description: "Tickets minted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearForm();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while minting tickets.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsMinting(false);
    }
  };

  const clearForm = () => {
    setEventName('');
    setTicketPrice('');
    setEventDescription('');
    setNumberOfTickets('');
  };

  return (
    <Box
      p={8}
      maxW="600px"
      mx="auto"
      mt={12}
      boxShadow="2xl"
      borderRadius="lg"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <VStack spacing={8} align="start">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" w="100%" color="teal.600">
          Mint Event Tickets
        </Text>

        <FormControl id="eventName" isRequired>
          <FormLabel color="teal.700">Event Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            focusBorderColor="teal.400"
            bg="white"
          />
        </FormControl>

        <FormControl id="ticketPrice" isRequired>
          <FormLabel color="teal.700">Ticket Price (Poly)</FormLabel>
          <Input
            type="number"
            placeholder="Enter ticket price in Poly"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            focusBorderColor="teal.400"
            bg="white"
          />
        </FormControl>

        <FormControl id="eventDescription" isRequired>
          <FormLabel color="teal.700">Event Description</FormLabel>
          <Textarea
            placeholder="Enter event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            focusBorderColor="teal.400"
            bg="white"
          />
        </FormControl>

        <FormControl id="numberOfTickets" isRequired>
          <FormLabel color="teal.700">Number of Tickets</FormLabel>
          <Input
            type="number"
            placeholder="Enter number of tickets"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(e.target.value)}
            focusBorderColor="teal.400"
            bg="white"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          w="full"
          isLoading={isMinting} // Adds a loading spinner
          isDisabled={isMinting} // Disables button while minting
          onClick={handleSubmit}
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          _focus={{ boxShadow: "outline" }}
        >
          {isMinting ? 'Minting...' : 'Mint Tickets'}
        </Button>
      </VStack>
    </Box>
  );
};

export default MintTicketForm;
