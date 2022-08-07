import { Flex, Spinner } from '@chakra-ui/react';
import { PropsWithChildren, Suspense } from 'react';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex as="main" py={10} alignItems={'center'} height={'80vh'}>
      <Suspense
        fallback={
          <Flex
            height={'90vh'}
            width={'100%'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Spinner colorScheme={'primary.400'} />
          </Flex>
        }
      >
        {children}
      </Suspense>
    </Flex>
  );
};

export default AppContainer;
