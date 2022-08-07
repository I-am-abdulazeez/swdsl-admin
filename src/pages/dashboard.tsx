import { lazy, Suspense, useLayoutEffect } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';

import DrinkSearch from '@components/DrinkSearch';
import { useProductStore } from '@store/useProductStore';

const Products = lazy(() => import('@components/Product/Products'));

const Dashboard: React.FC = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useLayoutEffect(() => {
    return () => fetchProducts();
  });

  return (
    <Box>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
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
