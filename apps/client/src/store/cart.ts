import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Product } from 'shared-types';

interface Other {
  quantity?: number;
}

type IProduct = Product & Other;

export interface ICartStore {
  items: IProduct[];
  actions: {
    add: (product: IProduct, { quantity }?: Other) => Promise<void>;
    remove: (id: string) => Promise<void>;
    update: (product: IProduct) => Promise<void>;
  };
}

export const useCartStore = create<ICartStore>()(
  devtools((set) => ({
    items: [],
    actions: {
      add: async (product, others = { quantity: 1 }) => {
        const newProduct = { ...product, ...others };

        set(({ items }) => {
          const itemExist = items.filter(({ _id }) => product._id === _id).length > 0;

          if (itemExist) {
            return {
              items: items.map((item) => {
                if (!item.quantity || !others.quantity) return item;

                const quantity = item.quantity + others.quantity;
                return item._id === product._id ? { ...item, quantity } : item;
              }),
            };
          }

          return { items: [...items, newProduct] };
        });
      },
      remove: async (id) => {
        set(({ items }) => ({
          items: items.filter((item) => item._id !== id),
        }));
      },
      update: async (product) => {
        set(({ items }) => ({
          items: items.map((item) => (item._id === product._id ? product : item)),
        }));
      },
    },
  }))
);

export default useCartStore;
