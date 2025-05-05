/** 유저카드 데이터 컬럼 */
export const userCardColumns = [
  { key: 'userCode', header: '유저코드' },
  { key: 'userId', header: '아이디' },
  { key: 'userName', header: '이름' },
  { key: 'cardNumber', header: '카드번호' },
  { key: 'createdAt', header: '발급일' },
  { key: 'currentBenefit', header: '최신혜택' },
  { key: 'status', header: '유저상태' },
] as const;
