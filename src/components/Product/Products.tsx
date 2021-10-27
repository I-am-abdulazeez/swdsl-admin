import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { toast, useToast } from "@chakra-ui/toast";
import {
  collection,
  DocumentSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { Link } from "react-router-dom";
import { firebaseFirstore } from "../../lib/firebase";
import ProductList from "./ProductList";

const Products = (): JSX.Element => {
  const toast = useToast();
  const ref = query(
    collection(firebaseFirstore, "products"),
    orderBy("createdAt", "desc")
  );
  const storeQuery = useFirestoreQuery(
    ["products"],
    ref,
    {},
    {
      onError(err) {
        console.log(err);
        toast({
          title: `Error fetching data ${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );
  const snapshot = storeQuery.data;

  console.log(snapshot);

  return (
    <Box mt={8}>
      {snapshot?.empty && (
        <Text>No product added. click on Drink upload to add one</Text>
      )}
      {storeQuery.isLoading && (
        <HStack spacing={2}>
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            size="sm"
            color="red.500"
          />
          <Text>Fetching Products</Text>
        </HStack>
      )}
      {storeQuery.isLoadingError && <Text>Error Fetching product</Text>}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        {snapshot?.docs?.map((docsSnapshot: DocumentSnapshot) => {
          const product = docsSnapshot.data();
          return (
            <Link to={`product/${docsSnapshot.id}`} key={docsSnapshot.id}>
              <ProductList product={product} />
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
