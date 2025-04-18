/** 주문데이터 컬럼 */
export const paymentColumns = [
  { key: 'paymentId', header: '결제 ID' },
  { key: 'createdAt', header: '결제일' },
  { key: 'orderCode', header: '주문번호' },
  { key: 'itemsSummary', header: '주문내역' },
  { key: 'totalPrice', header: '총 금액' },
  { key: 'status', header: '상태' },
] as const;
