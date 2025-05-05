/** 전체 결제내역 데이터 타입 */
export type TotalPaymentResDto = {
  userCode: string;
  userId: string;
  createdAt: string; // 결제일
  orderId: string;
  orderName: string;
  sponsorName: string;
  totalPrice: number; // 결제금액
};
