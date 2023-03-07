import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Product } from 'shared-types';

interface Other {
  quantity?: number;
}

export type IProduct = Product & Other;

export interface ICartStore {
  items: IProduct[];
  amount: number;
  actions: {
    add: (product: IProduct, others?: Other) => Promise<void>;
    remove: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
  };
}

export const useCartStore = create<ICartStore>()(
  devtools((set) => ({
    items: [],
    amount: 0,
    actions: {
      add: async (product, others = { quantity: 1 }) => {
        let newItems: IProduct[];

        set(({ items, amount }) => {
          const itemExist = items.filter(({ _id }) => product._id === _id).length > 0;

          // Update amount
          const updatedAmount = amount + product.price * (others.quantity || 1);

          if (itemExist) {
            // Update already exist item quantity
            newItems = items.map((item) => {
              if (!item.quantity || !others.quantity) return item;

              const quantity = item.quantity + others.quantity;
              return item._id === product._id ? { ...item, quantity } : item;
            });
          } else {
            // Add new product
            const newProduct = { ...product, ...others };
            newItems = [...items, newProduct];
          }

          return { items: newItems, amount: updatedAmount };
        });
      },
      remove: async (id) => {
        set(({ items }) => ({
          items: items.filter((item) => item._id !== id),
        }));
      },
      updateQuantity: async (id, quantity) => {
        set(({ items, amount }) => {
          let newAmount;

          const updatedItems = items.map((item) => {
            // Remove already added amount
            if (item._id === id && item.quantity) {
              const previousAmount = item.quantity * item.price;
              newAmount = item.price * quantity + (amount - previousAmount);
            }

            return item._id === id ? { ...item, quantity } : item;
          });

          return {
            items: updatedItems,
            amount: newAmount,
          };
        });
      },
    },
  }))
);

export default useCartStore;
