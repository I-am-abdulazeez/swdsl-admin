import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import { Box, Container, Flex, HStack, Spacer, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { useAuthStore } from '@store/useAuthStore';

const Brand = lazy(() => import('../Brand'));

const Navbar: React.FC = () => {
  const { user, signOutAdmin } = useAuthStore();
  const buttonSize = useBreakpointValue({
    base: 'xs',
    md: 'sm',
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
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          h={{ base: '12vh', md: '10vh' }}
          align="center"
          py={{ base: 4, md: 0 }}
        >
          <Brand />
          <Spacer />
          <HStack spacing={2} mt={{ base: 2, md: 0 }}>
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
                <Link to="/orders">
                  <Button size={buttonSize} variant="ghost">
                    Orders
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
