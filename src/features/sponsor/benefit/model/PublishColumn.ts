/** 발행혜택 컬럼 */
export const publishColumns = [
  { key: 'benefitCode', header: '협찬코드' },
  { key: 'benefitTitle', header: '협찬명' },
  { key: 'benefitProduct', header: '협찬상품' },
  { key: 'benefitContent', header: '협찬내용' },
  { key: 'createdAt', header: '발행일' },
  { key: 'endAt', header: '종료일' },
  { key: 'benefitCount', header: '발급수량' },
] as const;
