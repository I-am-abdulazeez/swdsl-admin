import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

import customTheme from '@assets/theme';
import { createBrowserHistory } from 'history';

export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const customToast = (options?: UseToastOptions | undefined) => {
  const { toast } = createStandaloneToast({ theme: customTheme });
  return toast({
    duration: 4000,
    isClosable: true,
    containerStyle: {
      fontSize: '12px',
    },
    ...options,
  });
};

export const Router = createBrowserHistory({ window });
