import { useMemo } from "react";

import { AuthError } from "firebase/auth";
import { FirestoreError } from "firebase/firestore";
import { MutationCache, QueryClient, QueryClientProvider } from "react-query";

import { useToast } from "@chakra-ui/react";

import { QueryClientWrapperProps } from "@interfaces/index";

const QueryClientWrapper: React.FC<QueryClientWrapperProps> = (props) => {
  const chakraToast = useToast();
  const { children } = props;

  const client = useMemo(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (err) => {
            const error = err as AuthError | FirestoreError;
            chakraToast({
              title: error?.message,
              isClosable: true,
              status: "error",
              variant: "subtle",
              duration: 6000,
              containerStyle: {
                fontSize: "12.5px",
              },
            });
          },
        }),
      }),
    []
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryClientWrapper;
