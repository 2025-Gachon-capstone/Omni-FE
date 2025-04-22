import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const existingItem = get().items.find((item) => item.productId === newItem.productId);
        if (existingItem) {
          // 이미 아이템이 존재하는 경우
          set({
            items: get().items.map((item) =>
              item.productId === newItem.productId
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,
            ),
          });
        } else {
          // 새 아이템 추가
          set({ items: [...get().items, newItem] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cartStorage',
    },
  ),
);
