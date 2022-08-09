import { lazy } from 'react';
import { Image } from '@chakra-ui/image';
import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';

import { numberWithCommas } from '@utils/index';
import { ProductType } from 'src/types';

const ProductBadge = lazy(() => import('./ProductBadge'));

const ProductList = ({ product }: ProductType) => {
  return (
    <VStack
      transition="all 0.3s ease-in-out"
      _hover={{
        shadow: 'sm',
        cursor: 'pointer',
      }}
      border="1px solid #EDF2F7"
      borderRadius="lg"
      spacing={1}
    >
      <Image
        display={'block'}
        p={7}
        height={'250px'}
        src={product?.url}
        alt={`product-${product?.drinkName}`}
      />
      <Stack spacing={2} p={4} width={'full'}>
        <Box>
          <HStack>
            <Heading
              textOverflow={'ellipsis'}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              as="h2"
              fontSize={'17px'}
            >
              {product?.drinkName}
            </Heading>
            <ProductBadge product={product} />
          </HStack>
          <Text fontWeight="semibold" fontSize="sm">
            {product?.description}
          </Text>
        </Box>
        <Box>
          <chakra.span fontSize={'20px'} fontWeight={'semibold'}>
            Price:{' '}
            <chakra.span fontWeight="medium" color="secondary.600">
              &#36;
              {numberWithCommas(product?.price)}
            </chakra.span>
          </chakra.span>
        </Box>
        <Box>
          <chakra.span
            fontSize="sm"
            color="gray.400"
            fontWeight="medium"
            mt="0px !important"
          >
            CreatedAt:{' '}
            <chakra.span>
              {new Date(product?.createdAt.seconds * 1000).toLocaleDateString(
                'en-US'
              )}
            </chakra.span>{' '}
          </chakra.span>
        </Box>
      </Stack>
    </VStack>
  );
};

export default ProductList;
