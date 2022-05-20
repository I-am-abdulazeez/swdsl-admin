import { useEffect, useState } from "react";

import { Box, HStack, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import ProductBadge from "@components/Product/ProductBadge";

import { useProduct } from "@hooks/useProduct";

const DrinkSearch: React.FC = () => {
  const { products } = useProduct();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log(products);
  });

  return (
    <div>
      <Input
        width={"100%"}
        type="text"
        placeholder="Search for drinks"
        onChange={(e) => setSearchTerm(e.target?.value)}
      />
      {searchTerm && (
        <Box
          padding={searchTerm ? 3 : 0}
          bgColor={"white"}
          maxHeight={"180px"}
          overflowY={"auto"}
          borderBottomRadius={"8px"}
          border={"1px solid #EDF2F7"}
        >
          {products
            .filter((drink) => {
              if (searchTerm === "" || searchTerm === " ") {
                return drink;
              } else if (
                drink
                  .data()
                  ?.drinkName?.toLowerCase()
                  ?.includes(searchTerm?.toLowerCase())
              ) {
                return drink;
              }
            })
            .map((drinkSnap) => {
              const drinks = drinkSnap?.data();
              return (
                <Link key={drinkSnap?.id} to={`product/${drinkSnap?.id}`}>
                  <HStack
                    cursor={"pointer"}
                    justify={"space-between"}
                    padding={"10px"}
                    borderRadius={"8px"}
                    fontSize={"15px"}
                    _hover={{
                      bgColor: "#F7FAFC",
                    }}
                  >
                    <Text fontWeight={"normal"}>{drinks?.drinkName}</Text>
                    <ProductBadge product={drinks} />
                  </HStack>
                </Link>
              );
            })}
        </Box>
      )}
    </div>
  );
};

export default DrinkSearch;
