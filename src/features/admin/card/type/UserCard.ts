/** 유저카드정보 컬럼 데이터 타입 */
export type UserCardResDto = {
  memberId: number;
  loginId: string;
  memberName: string;
  cardNumber: string;
  createdAt: string;
  updatedAt: string;
  benefitTitle: string;
  status: string;
};

/** 특정유저정보 데이터 타입 */
export type Benefits = {
  benefitId: number;
  title: string;
};
export type SelectedUserResDto = {
  memberId: number;
  cardId: number;
  memberName: string;
  cardNumber: string; // 카드번호
  createdAt: string; // 발급일자
  updatedAt: string; // 업데이트일자
  benefits: Benefits[]; // 최신혜택
};
