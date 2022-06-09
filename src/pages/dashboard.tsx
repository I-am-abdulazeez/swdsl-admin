import { lazy, Suspense } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import DrinkSearch from "@components/DrinkSearch";

const Products = lazy(() => import("@components/Product/Products"));

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text mb={{ base: 4, md: 0 }} fontSize="xl" fontWeight="semibold">
          Dashboard Page
        </Text>
        <DrinkSearch />
      </Flex>
      <Suspense fallback={<Text>Loading</Text>}>
        <Products />
      </Suspense>
    </Box>
  );
};

export default Dashboard;
