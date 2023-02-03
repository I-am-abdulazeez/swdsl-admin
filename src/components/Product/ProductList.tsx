import { lazy } from 'react';

import { Image } from '@chakra-ui/image';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';

import { numberWithCommas } from '@utils/index';
import { ProductType } from 'src/types';
import ProductTag from './ProductTag';

const ProductBadge = lazy(() => import('./ProductBadge'));

const ProductList = ({ product }: ProductType) => {
  return (
    <VStack
      transition={'all 0.3s ease-in-out'}
      _hover={{
        shadow: 'sm',
        cursor: 'pointer',
      }}
      border="1px solid #EDF2F7"
      borderRadius="lg"
      spacing={1}
    >
      <Image
        p={4}
        height={'150px'}
        borderRadius={'lg'}
        src={product?.url}
        alt={`product-${product?.drinkName}`}
      />
      <Stack spacing={2} p={3} width={'full'}>
        <Box>
          <ProductBadge product={product} />
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
            <ProductTag product={product} />
          </HStack>
          <Text
            fontWeight="semibold"
            fontSize="sm"
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
          >
            {product?.description}
          </Text>
        </Box>
        <Box>
          <chakra.span fontSize={'20px'} fontWeight={'semibold'}>
            <chakra.span fontWeight="medium" color="secondary.600">
              &#36;
              {numberWithCommas(product?.price)}
            </chakra.span>
          </chakra.span>
        </Box>
      </Stack>
      <Divider />
      <Box p={2}>
        <chakra.span
          fontSize="sm"
          color="gray.400"
          fontWeight="medium"
          mt="0px !important"
        >
          Upload date:{' '}
          <chakra.span>
            {new Date(product?.createdAt.seconds * 1000).toLocaleDateString(
              'en-US'
            )}
          </chakra.span>{' '}
        </chakra.span>
      </Box>
    </VStack>
  );
};

export default ProductList;
