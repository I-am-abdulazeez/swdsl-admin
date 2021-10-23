import { Button } from "@chakra-ui/button";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = (): JSX.Element => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <VStack spacing={3}>
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
    </>
  );
};

export default Home;
