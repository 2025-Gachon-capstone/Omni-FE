export type CustomBenefit = {
  reorderRatio: number; // 재구매 비율 (ex. 0.6)
  excludeProductIdList: number[]; // 제외된 제품 리스트
  title: string;
  startDate: Date;
  endDate: Date;
  discount_rate: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED';
};
