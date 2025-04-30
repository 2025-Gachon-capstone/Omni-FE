import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface PaymentInfo {
  cardNumber: string;
  orderName: string;
  orderPrice: number;
}

interface PendingState {
  items: CartItem[];
  paymentInfo: PaymentInfo;
  orderCode: string;
  setItems: (items: CartItem[]) => void;
  setPaymentInfo: (info: Partial<PaymentInfo>) => void;
  setOrderCode: (code: string) => void;
  reset: () => void;
}

// 세션 스토리지 구현
const sessionStorageImpl: PersistStorage<PendingState> = {
  getItem: async (name) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    sessionStorage.removeItem(name);
  },
};

export const usePendingStore = create<PendingState>()(
  persist(
    (set, get) => ({
      items: [],
      paymentInfo: {
        cardNumber: '',
        orderName: '',
        orderPrice: 0,
      },
      orderCode: '',
      setItems: (items) => set({ items }),
      setPaymentInfo: (info) => set({ paymentInfo: { ...get().paymentInfo, ...info } }),
      setOrderCode: (value) => set({ orderCode: value }),
      reset: () =>
        set({
          items: [],
          paymentInfo: {
            cardNumber: '',
            orderName: '',
            orderPrice: 0,
          },
          orderCode: '',
        }),
    }),
    {
      name: 'pending-items',
      storage: sessionStorageImpl,
    },
  ),
);
