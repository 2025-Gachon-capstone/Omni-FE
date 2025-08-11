// 재구매 데이터
export type ReorderData = {
  label: number;
  count: number;
};

// 주문시간, 요일 데이터
export type TimeData = {
  label: number;
  count: number;
};

// 관련상품 데이터
export type RelatedProductData = {
  productId: number;
  label: string;
  count: number;
};

export type StatisticsData = {
  reordered: ReorderData[];
  orderHour: TimeData[];
  orderDow: TimeData[];
  relatedProduct: RelatedProductData[];
  report: string;
  period: {
    max: string;
    min: string;
  };
};
