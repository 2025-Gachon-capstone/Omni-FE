/** 전체 유저 결제 데이터 컬럼 */
export const totalPaymentColumns = [
  { key: 'userCode', header: '유저코드' },
  { key: 'userId', header: '아이디' },
  { key: 'createdAt', header: '발급일' },
  { key: 'orderId', header: '주문번호' },
  { key: 'orderName', header: '주문명' },
  { key: 'sponsorName', header: '구매처' },
  { key: 'totalPrice', header: '결제금액' },
] as const;
