import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@chakra-ui/button';
import { Flex, Heading, Text, VStack } from '@chakra-ui/layout';

import { useAuthStore } from '@store/useAuthStore';

const Home: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Flex justify="center" align="center" height="70vh" width={'full'}>
      <VStack spacing={3} textAlign="center">
        <Heading>ShayowithDSL Admin Page.</Heading>
        <Text>This is where all drinks uploads are done</Text>
        {!user ? (
          <Link to="/login">
            <Button colorScheme="primary">Login Here</Button>
          </Link>
        ) : (
          <Link to="/dashboard">
            <Button colorScheme="primary">Dashboard</Button>
          </Link>
        )}
      </VStack>
    </Flex>
  );
};

export default Home;
