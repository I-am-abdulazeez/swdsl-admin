import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

import { Admin } from '@interfaces/index';
import { Product } from 'src/types';

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
  isEmptyProduct: boolean;
  isLoading: boolean | undefined;
  isLoadingError: boolean | undefined;
  isLoadingProduct: boolean | undefined;
  product: DocumentData | undefined;
  isLoadingSave: boolean | undefined;
};

export type ProductActions = {
  fetchProducts: () => void;
  fetchSingleProduct: (id: string | undefined) => void;
  saveProduct: (data: Product) => void;
};

export type ProductStore = ProductState & ProductActions;
