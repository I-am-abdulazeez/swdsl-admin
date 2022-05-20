import { useState } from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { firebaseFirstore } from "@lib/firebase";
import { useToast } from "@chakra-ui/react";

export const useProduct = () => {
  const [products, setProducts] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [emptyProduct, setEmptyProduct] = useState(false);

  const ref = query(
    collection(firebaseFirstore, "products"),
    orderBy("createdAt", "desc")
  );

  const chakraToast = useToast();

  const storeQuery = useFirestoreQuery(
    ["products"],
    ref,
    { subscribe: true, includeMetadataChanges: true },
    {
      onSuccess: (data) => {
        const products = data?.docs;
        setEmptyProduct(data.empty);
        setProducts(products);
      },
      onError: (error) => {
        chakraToast({
          status: "error",
          title: `${error.message}`,
          isClosable: true,
          containerStyle: {
            fontSize: "12.5px",
          },
          variant: "subtle",
          position: "bottom-right",
        });
      },
    }
  );

  return {
    products,
    storeQuery,
    emptyProduct,
  };
};
