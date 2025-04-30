/** 주문데이터 컬럼 */
export const paymentColumns = [
  { key: 'paymentId', header: '결제 ID' },
  { key: 'createdAt', header: '결제일' },
  { key: 'orderCode', header: '주문번호' },
  { key: 'orderName', header: '주문내역' },
  { key: 'paymentPrice', header: '총 금액' },
  { key: 'paymentStatus', header: '상태' },
] as const;
