import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

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
  fetchSingleProduct: (id) => {
    useProductStore.setState((state) => ({ ...state, isLoadingProduct: true }));
    const productRef = doc(firebaseFirstore, 'products', String(id));
    onSnapshot(
      productRef,
      (docSnap) => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingProduct: false,
          product: { ...docSnap?.data(), id: docSnap?.id },
        }));
      },
      (error) => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingProduct: false,
          product: undefined,
        }));
        console.log(error);
        customToast({
          title: error.message,
          status: 'error',
        });
      }
    );
  },
  saveProduct: async (data, reset, setFile) => {
    useProductStore.setState((state) => ({ ...state, isLoadingSave: true }));
    const collectionRef = collection(firebaseFirstore, 'products');
    await addDoc(collectionRef, data)
      .then(() => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingSave: false,
        }));
        customToast({
          title: 'Data saved successfully',
          status: 'success',
        });
        reset();
        setFile(null);
      })
      .catch((error: FirestoreError) => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingSave: false,
        }));
        customToast({
          title: error.message,
          status: 'error',
        });
      });
  },
};
