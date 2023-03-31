import create from 'zustand';

import { ProductState, ProductStore } from '@store/types';
import { devtools, persist } from 'zustand/middleware';
import { productActions } from '@store/actions/product-actions';

const initialState: ProductState = {
  products: null,
  product: null,
  isEmptyProduct: false,
  isFetchingProducts: false,
  isFetchingError: false,
  isFetchingProduct: false,
  isLoading: false,
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
