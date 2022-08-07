import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';

import { Admin } from '@interfaces/index';
import { firebaseAuth } from '@lib/firebase';
import { AuthActions } from '@store/types';

import { useAuthStore } from '@store/useAuthStore';

import { createStandaloneToast } from '@chakra-ui/react';

import customTheme from '@assets/theme';

const { toast } = createStandaloneToast({ theme: customTheme });

export const Actions: AuthActions = {
  signInAdmin: (user: Admin) => {
    const { email, password } = user;
    useAuthStore.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => {
        useAuthStore.setState((state) => ({
          ...state,
          isLoading: false,
          user: user.user,
          isLoggedIn: true,
          userId: user.user.uid,
        }));
        toast({
          status: 'success',
          title: 'Logged in successfully',
          duration: 3000,
          isClosable: true,
          containerStyle: {
            fontSize: '12px',
          },
        });
      })
      .catch((error: AuthError) => {
        useAuthStore.setState((state) => ({
          ...state,
          isLoading: false,
          isLoggedIn: false,
          userId: '',
        }));
        console.log(error);
        toast({
          status: 'error',
          title: error.message,
          duration: 3000,
          isClosable: true,
          containerStyle: {
            fontSize: '12px',
          },
        });
      });
  },
  signOutAdmin: () => {
    console.log('Clicked');
  },
};
