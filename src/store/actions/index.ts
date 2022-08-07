import { AuthError, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { Admin } from '@interfaces/index';
import { firebaseAuth } from '@lib/firebase';
import { AuthActions } from '@store/types';

import { useAuthStore } from '@store/useAuthStore';

import { customToast, Router } from '@utils/index';

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
        customToast({
          status: 'success',
          title: 'Logged in successfully',
        });
        Router.push('/dashboard');
      })
      .catch((error: AuthError) => {
        useAuthStore.setState((state) => ({
          ...state,
          isLoading: false,
          isLoggedIn: false,
          userId: '',
        }));
        console.log(error);
        customToast({
          status: 'error',
          title: error.message,
        });
      });
  },
  signOutAdmin: () => {
    signOut(firebaseAuth).then(() => {
      useAuthStore.setState((state) => ({
        ...state,
        user: null,
        isLoggedIn: false,
        userId: '',
      }));
      customToast({
        status: 'success',
        title: 'Logged out successfully',
      });
      Router.push('/');
    });
  },
};
