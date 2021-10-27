import { Box, Text } from "@chakra-ui/layout";
import { Flex, Input } from "@chakra-ui/react";
import Products from "../components/Product/Products";

const Dashboard = (): JSX.Element => {
  return (
    <Box>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text mb={{ base: 4, md: 0 }} fontSize="xl" fontWeight="semibold">
          Dashboard Page
        </Text>
        <Input
          maxWidth={{ base: "full", md: "max" }}
          type="text"
          placeholder="Search for drinks"
        />
      </Flex>
      <Products />
    </Box>
  );
};

export default Dashboard;
