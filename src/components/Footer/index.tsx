import { Box, Container, Heading, HStack, Text } from "@chakra-ui/layout";

const Footer = (): JSX.Element => {
  const date: Date = new Date();
  const year = date.getFullYear();

  return (
    <Box
      as="footer"
      h={{ base: "10.5vh", sm: "10vh", md: "10vh" }}
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
