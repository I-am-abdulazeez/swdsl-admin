import { Container, Flex } from '@chakra-ui/react';
import { PropsWithChildren, Suspense } from 'react';

import FallBackComponent from '@components/FallBackComponent';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex as="main" py={10} alignItems={'center'}>
      <Suspense fallback={<FallBackComponent />}>
        <Container maxWidth={'container.lg'}>{children}</Container>
      </Suspense>
    </Flex>
  );
};

export default AppContainer;
