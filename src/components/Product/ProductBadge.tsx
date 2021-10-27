import { Badge } from "@chakra-ui/layout";

const ProductBadge = ({ product, addMargin }: any): JSX.Element => {
  return (
    <Badge
      ml={addMargin}
      borderRadius="md"
      colorScheme={
        product?.category === "Cognac"
          ? "green"
          : product?.category === "Juice"
          ? "orange"
          : product?.category === "Whisky"
          ? "purple"
          : product?.category === "Non alcoholic"
          ? "teal"
          : ""
      }
    >
      {product?.category}
    </Badge>
  );
};

export default ProductBadge;
