/** (협찬사) 협찬 내용 데이터 타입 */
export interface BenefitResponseDTO {
  benefitId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  discounRate: number;
  targetProduct: string;
  amount: number;
  targetMember: string;
  status: 'PENDING' | 'DELETED' | 'COMPLETED';
};
