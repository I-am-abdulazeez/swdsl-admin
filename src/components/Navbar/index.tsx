import { Box, Container, Flex, HStack, Spacer } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Brand from "../Brand";
import { useAuth } from "../../hooks/useAuth";

const Navbar = (): JSX.Element => {
  const { user, signOutAdmin } = useAuth();
  return (
    <Box
      as="header"
      bg="rgba(255,255,255,0.8)"
      zIndex={5}
      position="sticky"
      backdropFilter="blur(12px)"
      borderBottom="1px solid #EDF2F7"
    >
      <Container maxW="container.lg">
        <Flex h="10vh" align="center">
          <Brand />
          <Spacer />
          <HStack spacing={2}>
            {!user ? (
              <Link to="/">
                <Button size="sm" variant="ghost">
                  Home
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button size="sm" variant="ghost">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="sm" variant="ghost">
                    Drinks Upload
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <Button
                onClick={signOutAdmin}
                size="sm"
                colorScheme="error"
                variant="solid"
              >
                Logout
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
