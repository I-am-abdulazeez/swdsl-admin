import { Image } from "@chakra-ui/image";
import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import ProductBadge from "./ProductBadge";

const ProductList = ({ product }: any) => {
  return (
    <HStack
      transition="all 0.3s ease-in-out"
      _hover={{
        shadow: "sm",
        cursor: "pointer",
      }}
      border="1px solid #EDF2F7"
      borderRadius="lg"
      spacing={6}
      p={4}
    >
      <Image
        width="80px"
        border="1px solid #EDF2F7"
        borderRadius="md"
        src={product?.url}
        alt={product?.id}
      />
      <Stack spacing={2} flex={1}>
        <Box>
          <Heading as="h2" size="md" mb={1}>
            {product?.drinkName}
            <ProductBadge addMargin={2} product={product} />
          </Heading>
          <Text fontWeight="medium" fontSize="sm">
            {product?.description}
          </Text>
        </Box>
        <Box>
          <chakra.span>
            Price:{" "}
            <chakra.span fontWeight="medium" color="secondary.500">
              {product?.price}
            </chakra.span>
          </chakra.span>
        </Box>
        <Box>
          <chakra.span
            fontSize="sm"
            color="gray.400"
            fontWeight="medium"
            mt="0px !important"
          >
            CreatedAt:{" "}
            <chakra.span>
              {new Date(product?.createdAt.seconds * 1000).toLocaleDateString(
                "en-US"
              )}
            </chakra.span>{" "}
          </chakra.span>
        </Box>
      </Stack>
    </HStack>
  );
};

export default ProductList;
