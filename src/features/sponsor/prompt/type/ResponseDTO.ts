import { BenefitFormData } from './FormDataType';

/** (협찬사) 협찬 내용 데이터 타입 */
export interface BenefitResponseDTO extends BenefitFormData {
  benefitId: number;
  status: 'PENDING' | 'BEFORE' | 'ONGOING' | 'EXPIRED' | 'DELETED';
}

export interface MessageDTO {
  chatMessageId: number | null;
  authorType: 'USER' | 'AI';
  content: string;
}

export interface MessageResponseDTO {
  messages: MessageDTO[];
  hasNext: boolean;
  hasPrev: boolean;
  currentPage: number;
}