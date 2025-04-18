import { BenefitFormData } from './FormDataType';

/** (협찬사) 협찬 내용 데이터 타입 */
export interface BenefitResponseDTO extends BenefitFormData {
  benefitId: number;
  status: 'PENDING' | 'DELETED' | 'COMPLETED';
}
