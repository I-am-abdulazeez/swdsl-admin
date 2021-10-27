import { Box, Container, Flex, HStack, Spacer } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Brand from "../Brand";
import { useAuth } from "../../hooks/useAuth";
import { useBreakpointValue } from "@chakra-ui/media-query";

const Navbar = (): JSX.Element => {
  const { user, signOutAdmin } = useAuth();
  const buttonSize = useBreakpointValue({
    base: "xs",
    md: "sm",
  });
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
                <Button size={buttonSize} variant="ghost">
                  Home
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button size={buttonSize} variant="ghost">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size={buttonSize} variant="ghost">
                    Drinks Upload
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <Button
                onClick={signOutAdmin}
                size={buttonSize}
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
