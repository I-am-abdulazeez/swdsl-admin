import { Tag } from '@chakra-ui/react';
import { ProductType } from 'src/types';

const ProductTag: React.FC<ProductType> = ({ product }) => {
  return (
    <>
      {product?.packsOrWholesale && (
        <Tag
          fontWeight={'semibold'}
          fontSize={'12px'}
          variant={'outline'}
          colorScheme={
            product?.packSize === '3 Packs'
              ? 'primary'
              : product?.packSize === '4 Packs'
              ? 'green'
              : product?.packSize === '6 Packs'
              ? 'pink'
              : product?.packSize === '10 Packs'
              ? 'orange'
              : product?.packSize === '12 Packs'
              ? 'yellow'
              : undefined
          }
        >
          {product?.packSize}
        </Tag>
      )}
    </>
  );
};

export default ProductTag;
