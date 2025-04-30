/** 혜택 아이템 */
// export type Benefit = {
//   cardBenefitId: number;
//   benefitName: string;
//   company: string;
//   updatedAt: string;
//   expired: string;
//   status: string; // 혜택 사용가능 여부
// };

export type Benefit = {
  cardBenefitId: number;
  benefitId: number;
  title: string;
  sponsorName: string;
  discountRate: number;
  updatedAt: string;
  endDate: string;
  status: string;
  targetProduct: string;
};
