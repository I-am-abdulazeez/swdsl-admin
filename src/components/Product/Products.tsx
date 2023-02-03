import { Link } from 'react-router-dom';

import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { lazy, Suspense } from 'react';

import { useProductStore } from '@store/useProductStore';
import { Skeleton, SkeletonText } from '@chakra-ui/react';

const ProductList = lazy(() => import('./ProductList'));

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const isEmptyProduct = useProductStore((state) => state.isEmptyProduct);
  const isLoadingError = useProductStore((state) => state.isLoadingError);

  return (
    <Box mt={8}>
      {isEmptyProduct && (
        <Text>No product added. click on Drinks upload to add one</Text>
      )}
      {isLoading && (
        <HStack spacing={2} mb={2}>
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            size="sm"
            color="red.500"
          />
          <Text>Fetching Products</Text>
        </HStack>
      )}
      {isLoadingError && <Text>Error Fetching product</Text>}
      <Text fontSize="lg" fontWeight="medium" my={3}>
        There are {products?.length} wines available
      </Text>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        {products?.map((product) => {
          return (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Suspense
                fallback={
                  <Box
                    borderRadius={5}
                    border={'1px solid #EDF2F7'}
                    height={'350px'}
                    p={4}
                  >
                    <Skeleton height={'200px'} />
                    <SkeletonText
                      noOfLines={3}
                      spacing="4"
                      mt="4"
                      skeletonHeight="2"
                    />
                  </Box>
                }
              >
                <ProductList product={product} />
              </Suspense>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
