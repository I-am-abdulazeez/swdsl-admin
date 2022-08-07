import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { DocumentSnapshot } from '@firebase/firestore';
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useProduct } from '@hooks/useProduct';

const ProductList = lazy(() => import('./ProductList'));

const Products: React.FC = () => {
  const { products, storeQuery, emptyProduct } = useProduct();

  return (
    <Box mt={8}>
      {emptyProduct && (
        <Text>No product added. click on Drinks upload to add one</Text>
      )}
      {storeQuery.isFetching && (
        <HStack spacing={2}>
          <Spinner
            thickness="1px"
            speed="0.65s"
            emptyColor="gray.200"
            size="sm"
            color="red.500"
          />
          <Text>Fetching Products</Text>
        </HStack>
      )}
      {storeQuery.isLoadingError && <Text>Error Fetching product</Text>}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {products.map((docsSnapshot: DocumentSnapshot) => {
          const product = docsSnapshot.data();
          return (
            <Link to={`/product/${docsSnapshot.id}`} key={docsSnapshot.id}>
              <Suspense fallback={<Text>Loading...</Text>}>
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
