/** 전체 결제내역 데이터 타입 */
export type TotalPaymentResDto = {
  loginId: string;
  memberName: string;
  paymentId: number; // 주문아이디
  createAt: string; // 결제일
  orderCode: string; // 주문코드
  orderName: string; // 주문명
  sponsorName: string; // 협찬사
  totalPrice: number; // 결제금액
  status: string;
};
