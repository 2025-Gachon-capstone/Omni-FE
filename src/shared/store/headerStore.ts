import { create } from 'zustand';

/** 헤더 높이 상태 관리 */
interface HeaderState {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height }),
}));
