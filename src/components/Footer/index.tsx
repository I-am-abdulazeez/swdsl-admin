import { Box, Container, Heading, HStack, Text } from "@chakra-ui/layout";

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Box
      as="footer"
      p={2}
      borderTopLeftRadius="lg"
      position="fixed"
      bottom={0}
      right={0}
      bg="gray.100"
    >
      <Container maxW="container.lg" h="100%">
        <HStack spacing={4} h="100%">
          <Text fontWeight="semibold">&copy;{year}</Text>
          <Heading size="sm" fontWeight="semibold">
            ShayowithDSL
          </Heading>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
