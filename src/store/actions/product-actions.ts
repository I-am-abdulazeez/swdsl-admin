import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { ProductActions } from '@store/types';
import { useProductStore } from '@store/useProductStore';
import { firebaseFirstore } from '@lib/firebase';
import { customToast } from '@utils/index';

export const productActions: ProductActions = {
  fetchProducts: () => {
    useProductStore.setState((state) => ({ ...state, isLoading: true }));
    const productQuery = query(
      collection(firebaseFirstore, 'products'),
      orderBy('createdAt', 'desc')
    );
    // Get data from firestore
    onSnapshot(
      productQuery,
      (snapshot) => {
        useProductStore.setState((state) => ({
          ...state,
          isEmptyProduct: false,
          isLoading: false,
          isLoadingError: false,
          products: snapshot?.docs.map((doc) => {
            return { ...doc?.data(), id: doc.id };
          }),
        }));
      },
      (error) => {
        useProductStore.setState((state) => ({
          ...state,
          isEmptyProduct: true,
          isLoading: false,
          products: null,
          isLoadingError: true,
        }));
        customToast({
          title: error.message,
          status: 'error',
        });
      }
    );
  },
};
