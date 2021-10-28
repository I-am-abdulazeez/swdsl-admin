import { lazy, Suspense } from "react";
import { HStack, Text } from "@chakra-ui/layout";

const ProductDelete = lazy(() => import("./ProductDelete"));
const ProductEdit = lazy(() => import("./ProductEdit"));

const ProductActions = ({ snapshot }: any): JSX.Element => {
  return (
    <HStack>
      <Suspense fallback={<Text>Loading</Text>}>
        <ProductEdit snapshot={snapshot} />
        <ProductDelete snapshot={snapshot} />
      </Suspense>
    </HStack>
  );
};

export default ProductActions;
