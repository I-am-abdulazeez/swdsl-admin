import { Tag } from '@chakra-ui/react';
import { ProductType } from 'src/types';

const ProductTag: React.FC<ProductType> = ({ product }) => {
  return (
    <>
      {product?.packsOrWholesale && (
        <Tag
          mb={1}
          borderRadius={3}
          fontWeight={'semibold'}
          alignSelf={'end'}
          fontSize={'12px'}
          colorScheme={
            product?.packSize === '12 Packs' ? 'primary' : 'secondary'
          }
        >
          {product?.packSize}
        </Tag>
      )}
    </>
  );
};

export default ProductTag;
