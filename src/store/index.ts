import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { Actions } from './actions';
import { AuthState, AuthStore } from './types';

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
