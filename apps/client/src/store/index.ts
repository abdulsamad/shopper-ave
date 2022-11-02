import create from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IRootStore {
  products: object[];
  addProduct: (product: object) => void;
}

export const useRootStore = create<IRootStore>()(
  devtools((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  }))
);

export default useRootStore;
