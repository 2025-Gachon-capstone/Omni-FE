import { BenefitFormData } from './FormDataType';

/** (협찬사) 혜택 생성/수정 요청 DTO */
export interface BenefitRequestDTO extends BenefitFormData {
  status: 'PENDING' | 'DELETED' | 'COMPLETED';
}
  
