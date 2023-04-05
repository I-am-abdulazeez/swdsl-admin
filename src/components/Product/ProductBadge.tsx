import { Badge } from '@chakra-ui/layout';

import { ProductType } from 'src/types';

const ProductBadge: React.FC<ProductType> = ({ product }) => {
  return (
    <Badge
      rounded={'md'}
      colorScheme={
        product?.category === 'Cognac'
          ? 'whatsapp'
          : product?.category === 'Juice'
          ? 'orange'
          : product?.category === 'Whiskey'
          ? 'purple'
          : product?.category === 'Red wine'
          ? 'red'
          : product?.category === 'Champagne'
          ? 'cyan'
          : product?.category === 'Rum'
          ? 'yellow'
          : product?.category === 'Irish cream'
          ? 'twitter'
          : product?.category === 'White wine'
          ? 'gray'
          : product?.category === 'Gin'
          ? 'green'
          : product?.category === 'Sparkling wine'
          ? 'primary'
          : product?.category === 'Brandy'
          ? 'secondary'
          : product?.category === 'Tequila'
          ? 'messenger'
          : product?.category === 'Vodka'
          ? 'pink'
          : product?.category === 'Others'
          ? 'teal'
          : undefined
      }
    >
      {product?.category}
    </Badge>
  );
};

export default ProductBadge;
