import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
          title: 'Product added successfully',
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
  editProduct: async (id, data, onClose, setFile) => {
    useProductStore.setState((state) => ({ ...state, isLoadingEdit: true }));
    const productRef = doc(firebaseFirstore, 'products', String(id));
    await updateDoc(productRef, data)
      .then(() => {
        onClose();
        useProductStore.setState((state) => ({
          ...state,
          isLoadingEdit: false,
        }));
        customToast({
          title: 'Product updated successfully',
          status: 'success',
        });
        setFile(null);
      })
      .catch((error: FirestoreError) => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingEdit: false,
        }));
        customToast({
          title: error.message,
          status: 'error',
        });
      });
  },
  deleteProduct: async (id, onClose) => {
    useProductStore.setState((state) => ({ ...state, isLoadingDelete: true }));
    const productRef = doc(firebaseFirstore, 'products', String(id));
    await deleteDoc(productRef)
      .then(() => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingDelete: false,
        }));
        customToast({
          title: 'Product deleted successfully',
          status: 'success',
        });
        onClose();
        history.back();
      })
      .catch((error: FirestoreError) => {
        useProductStore.setState((state) => ({
          ...state,
          isLoadingDelete: false,
        }));
        customToast({
          title: error.message,
          status: 'error',
        });
      });
  },
};
