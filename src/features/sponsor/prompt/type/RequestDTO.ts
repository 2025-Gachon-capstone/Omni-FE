import { BenefitFormData } from './FormDataType';

/** (협찬사) 혜택 생성/수정 요청 DTO */
export interface BenefitRequestDTO extends Omit<BenefitFormData, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'BEFORE' | 'ONGOING' | 'EXPIRED' | 'DELETED';
}
  
export interface MesssageRequestDTO {
  content: string;
}
