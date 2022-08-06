import { Admin } from '@interfaces/index';
import { AuthActions } from '@store/types';

import { useAuthStore } from '@store/index';

export const Actions: AuthActions = {
  signInAdmin: (user: Admin) => {
    useAuthStore.setState((state) => ({
      ...state,
      isLoading: true,
    }));
  },
  signOutAdmin: () => {
    console.log('Clicked');
  },
};
