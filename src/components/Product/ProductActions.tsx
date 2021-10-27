import { HStack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import ProductDelete from "./ProductDelete";
import ProductEdit from "./ProductEdit";

const ProductActions = ({ snapshot }: any): JSX.Element => {
  return (
    <HStack>
      <Tooltip
        borderRadius="md"
        placement="right"
        label="Edit product"
        hasArrow
      >
        <ProductEdit snapshot={snapshot} />
      </Tooltip>
      <Tooltip
        borderRadius="md"
        placement="top"
        label="Remove product"
        hasArrow
      >
        <ProductDelete snapshot={snapshot} />
      </Tooltip>
    </HStack>
  );
};

export default ProductActions;
