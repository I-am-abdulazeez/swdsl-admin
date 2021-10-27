import { Box, Spacer, Text } from "@chakra-ui/layout";
import { Flex, Input } from "@chakra-ui/react";
import Products from "../components/Product/Products";

const Dashboard = (): JSX.Element => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontSize="xl" fontWeight="semibold">
          Dashboard Page
        </Text>
        <Input maxWidth="max" type="text" placeholder="Search for drinks" />
      </Flex>
      <Products />
    </Box>
  );
};

export default Dashboard;
