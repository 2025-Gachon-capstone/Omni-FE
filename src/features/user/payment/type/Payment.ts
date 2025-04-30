/** 한 주문에 포함된 아이템 타입 */
export type PaymentItem = {
  orderItemId: number;
  productName: string;
  sponsorName: string;
  quantity: number;
};

/** 주문 타입 */
export type PaymentResDto = {
  paymentId: number;
  createdAt: string;
  orderCode: string;
  orderName: string;
  Items: PaymentItem[];
  paymentPrice: number;
  paymentStatus: string;
};
