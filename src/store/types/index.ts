import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

import { Admin, UploadFormState } from '@interfaces/index';
import { Product } from 'src/types';
import { UseFormReset } from 'react-hook-form';
import React from 'react';

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
  product: DocumentData | null;
  isLoadingSave: boolean | undefined;
  isLoadingEdit: boolean | undefined;
  isLoadingDelete: boolean | undefined;
};

export type ProductActions = {
  fetchProducts: () => void;
  fetchSingleProduct: (id: string | undefined) => void;
  saveProduct: (
    data: Product,
    reset: UseFormReset<UploadFormState>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => void;
  editProduct: (
    id: string | undefined,
    data: DocumentData,
    onClose: () => void,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => void;
  deleteProduct: (id: string | undefined, onClose: () => void) => void;
};

export type ProductStore = ProductState & ProductActions;
