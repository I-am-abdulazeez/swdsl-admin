import { Flex, Spinner } from '@chakra-ui/react';

const FallBackComponent = () => {
  return (
    <Flex
      height={'70vh'}
      width={'100%'}
      justifyContent="center"
      alignItems={'center'}
    >
      <Spinner colorScheme={'primary'} />
    </Flex>
  );
};

export default FallBackComponent;
