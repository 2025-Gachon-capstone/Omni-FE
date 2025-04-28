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
  loginId: string;
  password: string;
  eqPassword: string;
  sponsorNumber: string;
  sponsorName: string;
  categoryId: number;
  category: string;
  isValid: boolean;
};
