import { Box, HStack, Text, Flex, Heading, VStack } from '@chakra-ui/layout';
import { lazy, useEffect } from 'react';
import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Spacer, Tag } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { chakra } from '@chakra-ui/system';
import { RiArrowLeftLine } from 'react-icons/ri';

import { useParams, useNavigate } from 'react-router-dom';

import { ProductParams } from 'src/types';
import { useProductStore } from '@store/useProductStore';

const ProductTag = lazy(() => import('./ProductTag'));
const ProductBadge = lazy(() => import('./ProductBadge'));
const ProductActions = lazy(() => import('./ProductActions'));

const ProductDetails: React.FC = () => {
  const { id } = useParams<ProductParams>();
  const navigateTo = useNavigate();

  const product = useProductStore((state) => state.product);
  const isLoading = useProductStore((state) => state.isFetchingProduct);
  const fetchSingleProduct = useProductStore(
    (state) => state.fetchSingleProduct
  );

  useEffect(() => {
    fetchSingleProduct(id);
    return () => useProductStore.destroy();
  }, []);

  if (isLoading) {
    return <Spinner color="red" />;
  }

  return (
    <Box>
      <Flex>
        <IconButton
          aria-label="back-button"
          size="sm"
          onClick={() => navigateTo(-1)}
          icon={<RiArrowLeftLine size="18px" />}
        />
        <Spacer />
        <ProductActions product={product} />
      </Flex>
      <Box mt={4}>
        <Text>
          Product id - <chakra.span fontWeight="medium">{id}</chakra.span>
        </Text>
        <HStack mt={6} spacing={6}>
          <Image
            width="150px"
            border="1px solid #EDF2F7"
            borderRadius="md"
            src={product?.url}
            alt={product?.id}
          />
          <VStack align={'flex-start'}>
            <HStack>
              <Heading mt="0">{product?.drinkName}</Heading>
              <ProductTag product={product} />
            </HStack>
            <ProductBadge product={product} />
            <chakra.span mt="0" fontSize="md">
              {product?.description}
            </chakra.span>
            <Box>
              <chakra.span
                fontWeight="bold"
                fontSize={'lg'}
                color="secondary.600"
              >
                &#36;
                {product?.price}
              </chakra.span>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductDetails;
