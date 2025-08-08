import { create } from 'zustand';
import { RelatedProductData } from '../type/StatisticsType';
import { CustomBenefit } from '../type/CustomBenefit';

interface CustomBenefitState {
  customState: CustomBenefit; // 맞춤 마케팅 혜택 데이터 (비율, 제외 단어, 혜택조정)
  // 비율(재 구매) 메서드
  setRatio: (ratio: number) => void;
  // 제품 제외 메서드
  addExcludeProduct: (product: RelatedProductData) => void;
  subExcludeProduct: (product: RelatedProductData) => void;
  // 혜택 조정 값 설정 메서드
  setTitle: (title: string) => void;
  setDiscount: (discount: number) => void;
  setAmount: (amount: number) => void;
  setDate: (type: string, date: Date) => void;
}

const initialCustomBenefit: CustomBenefit = {
  reorderRatio: 0.5,
  excludeProductIdList: [],
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  discount_rate: 0,
  amount: 0,
  status: 'PENDING',
};

export const useCustomBenefit = create<CustomBenefitState>((set, get) => ({
  customState: initialCustomBenefit,
  // 비율 메서드
  setRatio: (ratio) => {
    const { customState } = get();
    set({ customState: { ...customState, reorderRatio: ratio } });
  },
  // 관련 제품 제외 메서드
  addExcludeProduct: (product) => {
    const { customState } = get();
    if (!customState.excludeProductIdList.includes(product)) {
      set({
        customState: {
          ...customState,
          excludeProductIdList: [...customState.excludeProductIdList, product],
        },
      });
    }
  },
  subExcludeProduct: (product) => {
    const { customState } = get();
    set({
      customState: {
        ...customState,
        excludeProductIdList: customState.excludeProductIdList.filter(
          (el) => el.productId !== product.productId,
        ),
      },
    });
  },
  // 혜택 조정 값 설정 메서드
  setTitle: (title) => {
    const { customState } = get();
    set({ customState: { ...customState, title: title } });
  },
  setDiscount: (discount) => {
    const { customState } = get();
    set({ customState: { ...customState, discount_rate: discount } });
  },
  setAmount: (amount) => {
    const { customState } = get();
    set({ customState: { ...customState, amount: amount } });
  },
  setDate: (type, date) => {
    const { customState } = get();
    if (type === 'start') {
      if (!customState.endDate) set({ customState: { ...customState, startDate: date } });
      else {
        if (date <= customState.endDate) set({ customState: { ...customState, startDate: date } });
      }
    } else {
      if (!customState.startDate) set({ customState: { ...customState, endDate: date } });
      else {
        if (date >= customState.startDate) set({ customState: { ...customState, endDate: date } });
      }
    }
  },
}));
