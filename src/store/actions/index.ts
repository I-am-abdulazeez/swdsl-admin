import { Admin } from '@interfaces/index';
import { AuthActions } from '@store/types';

export const Actions: AuthActions = {
  signInAdmin: (user: Admin) => {
    console.log(user);
  },
  signOutAdmin: () => {
    console.log('Clicked');
  },
};
