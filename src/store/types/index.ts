import { Admin } from '@interfaces/index';
import { User } from 'firebase/auth';

export type AuthState = {
  user: User | null;
  isLoading: boolean | undefined;
  isLoggedIn: boolean;
  userId: string | null;
};

export type AuthActions = {
  signInAdmin: (user: Admin) => void;
  signOutAdmin: () => void;
};

export type AuthStore = AuthState & AuthActions;
