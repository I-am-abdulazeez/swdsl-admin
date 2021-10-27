import { Button, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { Box, HStack, Text, Flex, Heading } from "@chakra-ui/layout";
import { Spacer, Tooltip } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import { doc } from "@firebase/firestore";
import {
  useFirestoreDocument,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";
import {
  RiArrowLeftLine,
  RiDeleteBin3Line,
  RiPencilLine,
} from "react-icons/ri";
import { useParams, useHistory } from "react-router-dom";
import { firebaseFirstore } from "../../lib/firebase";
import ProductBadge from "./ProductBadge";
import ProductActions from "./ProductActions";

type ProductDetailsParams = {
  id: string;
};

const ProductDetails = (): JSX.Element => {
  const { id } = useParams<ProductDetailsParams>();
  const history = useHistory();
  const ref = doc(firebaseFirstore, "products", id);
  const product = useFirestoreDocument(["products", id], ref, {
    subscribe: true,
  });
  const snapshot = product.data;

  if (product.isLoading) {
    return <Spinner color="blue" />;
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
          <Box>
            <ProductBadge product={snapshot?.data()} />
            <Heading my={0}>{snapshot?.data()?.drinkName}</Heading>
            <chakra.span fontSize="lg">
              Description: {snapshot?.data()?.description}
            </chakra.span>
            <Heading fontWeight="semibold" size="md" mt={3} color="gray.500">
              Price:{" "}
              <chakra.span fontWeight="bold" color="secondary.500">
                {snapshot?.data()?.price}
              </chakra.span>
            </Heading>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductDetails;
