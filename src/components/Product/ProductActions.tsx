import { lazy, Suspense } from 'react';
import { HStack, Text } from '@chakra-ui/layout';
import { ProductType } from 'src/types';

const ProductDelete = lazy(() => import('./ProductDelete'));
const ProductEdit = lazy(() => import('./ProductEdit'));

const ProductActions = ({ product }: ProductType) => {
  return (
    <HStack>
      <Suspense fallback={<Text>Loading</Text>}>
        <ProductEdit product={product} />
        <ProductDelete product={product} />
      </Suspense>
    </HStack>
  );
};

export default ProductActions;
