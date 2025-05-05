/** 유저카드정보 컬럼 데이터 타입 */
export type UserCardResDto = {
  userCode: string;
  userId: string;
  userName: string;
  cardNumber: string;
  createdAt: string;
  currentBenefit: string;
  status: string;
};

/** 특정유저정보 데이터 타입 */
export type SelectedUserResDto = {
  userCode: string;
  userId: string;
  userName: string; // 발급인
  cardNumber: string; // 카드번호
  createdAt: string; // 발급일자
  currentBenefit: string[]; // 최신혜택
  status: string;
};
