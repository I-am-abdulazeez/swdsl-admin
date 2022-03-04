import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, HStack, Text, Flex, Heading, VStack } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import { doc } from "@firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { lazy } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useParams, useHistory } from "react-router-dom";
import { firebaseFirstore } from "../../lib/firebase";

const ProductBadge = lazy(() => import("./ProductBadge"));
const ProductActions = lazy(() => import("./ProductActions"));

type ProductDetailsParams = {
  id: string;
};

const ProductDetails = (): JSX.Element => {
  const { id } = useParams<ProductDetailsParams>();
  const history = useHistory();
  const ref = doc(firebaseFirstore, "products", id);
  const product = useFirestoreDocument(["products", id], ref, {
    subscribe: true,
    includeMetadataChanges: true,
  });
  const snapshot = product.data;

  if (product.isLoading) {
    return <Spinner color="red" />;
  }

  return (
    <Box>
      <Flex>
        <IconButton
          aria-label="back-button"
          size="sm"
          onClick={() => history.goBack()}
          icon={<RiArrowLeftLine size="18px" />}
        />
        <Spacer />
        <ProductActions snapshot={snapshot?.data()} />
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
            src={snapshot?.data()?.url}
            alt={snapshot?.data()?.id}
          />
          <VStack align={"flex-start"}>
            <ProductBadge product={snapshot?.data()} />
            <Heading mt="0">{snapshot?.data()?.drinkName}</Heading>
            <chakra.span mt="0" fontSize="md">
              {snapshot?.data()?.description}
            </chakra.span>
            <Box>
              <chakra.span
                fontWeight="bold"
                fontSize={"lg"}
                color="secondary.600"
              >
                &#36;
                {snapshot?.data()?.price}
              </chakra.span>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductDetails;
