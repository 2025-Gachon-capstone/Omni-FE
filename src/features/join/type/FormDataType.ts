/** (일반유저) 회원가입 데이터 타입 */
export type UserFormData = {
  name: string;
  loginId: string;
  password: string;
  eqPassword: string;
  cardPassword: string;
};

/** (협찬사) 회원가입 데이터 타입 */
export type SponsorFormData = {
  name: string;
  id: string;
  password: string;
  passwordCheck: string;
  bNumber: string;
  bName: string;
  bCategory: string;
  isValid: boolean;
};
