import React from 'react';
import { Box, Flex, Heading, Text, Button, VStack } from '@chakra-ui/react';

const HeroSection = () => {
  return (
    <Box
      bgImage="url('/path/to/your/background.jpg')" // Add your own background image
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      h="100vh"
      w="100%"
      position="relative"
      color="white"
    >
      {/* Optional Overlay for Better Contrast */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={1}
      />

      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        h="100%"
        zIndex={2}
        position="relative"
        px={4}
      >
        {/* Hero Content */}
        <VStack spacing={8} maxW="900px" align="center">
          <Heading
            as="h1"
            fontSize={{ base: '2.5rem', md: '4.5rem', lg: '5rem' }}
            fontWeight="bold"
            lineHeight="1.2"
            textTransform="uppercase"
            letterSpacing="wide"
            textShadow="2px 2px 5px rgba(0, 0, 0, 0.7)" // Add a subtle shadow to make text pop
          >
            Experience the Future of Ticketing
          </Heading>

          <Text
            fontSize={{ base: '1rem', md: '1.25rem', lg: '1.5rem' }}
            maxW="700px"
            opacity={0.9}
            textShadow="1px 1px 3px rgba(0, 0, 0, 0.7)"
          >
            Tixy is a decentralized, secure, and fraud-proof NFT-based ticketing platform. Buy, sell, and manage your event tickets with ease and security.
          </Text>

          {/* Call to Action Button */}
          <Button
            size="lg"
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500)"
            _hover={{ bgGradient: 'linear(to-r, teal.500, teal.600)' }}
            _active={{ bgGradient: 'linear(to-r, teal.600, teal.700)' }}
            _focus={{ outline: 'none' }}
            boxShadow="lg"
            px={8}
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            Get Started
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HeroSection;
