import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { AuthState, AuthStore } from '@store/types';
import { Actions } from '@store/actions';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(() => ({
      ...initialState,
      ...Actions,
    }))
  )
);
