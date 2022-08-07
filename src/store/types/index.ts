import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

import { Admin } from '@interfaces/index';

// Auth types
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

// Product types
export type ProductState = {
  products: DocumentData[] | null;
  emptyProduct: boolean;
  isLoading: boolean | undefined;
};

export type ProductActions = {
  fetchProducts: () => void;
};

export type ProductStore = ProductState & ProductActions;
