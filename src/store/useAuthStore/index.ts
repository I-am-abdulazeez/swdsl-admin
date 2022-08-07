import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { Actions } from '@store/actions';
import { AuthState, AuthStore } from '@store/types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  userId: '',
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      () => ({
        ...initialState,
        ...Actions,
      }),
      { name: 'authState' }
    )
  )
);