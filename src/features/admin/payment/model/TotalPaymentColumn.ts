/** 전체 유저 결제 데이터 컬럼 */
export const totalPaymentColumns = [
  { key: 'loginId', header: '아이디' },
  { key: 'memberName', header: '주문자명' },
  { key: 'createAt', header: '결제일' },
  { key: 'orderCode', header: '주문번호' },
  { key: 'orderName', header: '주문명' },
  { key: 'sponsorName', header: '구매처' },
  { key: 'totalPrice', header: '결제금액' },
] as const;
