import create from 'zustand';

import { ProductState, ProductStore } from '@store/types';
import { devtools, persist } from 'zustand/middleware';
import { productActions } from '@store/actions/product-actions';

const initialState: ProductState = {
  products: null,
  isEmptyProduct: false,
  isLoading: false,
  isLoadingError: false,
  isLoadingProduct: false,
  product: undefined,
  isLoadingSave: false,
  isLoadingEdit: false,
  isLoadingDelete: false,
};

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      () => ({
        ...initialState,
        ...productActions,
      }),
      { name: 'productState' }
    )
  )
);
