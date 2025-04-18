/** 한 주문에 포함된 아이템 타입 */
export type PaymentItem = {
  orderId: number;
  name: string;
  price: number;
  quantity: number;
};

/** 주문 타입 */
export type PaymentResDto = {
  paymentId: number;
  createdAt: string;
  orderCode: string;
  Items: PaymentItem[];
  totalPrice: number;
  status: string;
};

/** 주문데이터 컬럼요소값 변경 타입 (ex. .. 외 1건)*/
export type AugmentedPayment = PaymentResDto & {
  itemsSummary: string;
};
