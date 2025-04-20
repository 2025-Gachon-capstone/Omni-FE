import { BenefitFormData } from './FormDataType';
import { BenefitRequestDTO } from './RequestDTO';
import { BenefitResponseDTO } from './ResponseDTO';

export function convertBenefitResponseToForm(dto: BenefitResponseDTO): BenefitFormData {
  const { benefitId, status, ...formData } = dto; // 필요 없는 필드 제거
  return formData;
}

export function convertBenefitFormToRequest(
  formData: BenefitFormData,
  status: 'PENDING' | 'BEFORE' | 'ONGOING' | 'EXPIRED' | 'DELETED',
): BenefitRequestDTO {
  return {
    ...formData,
    status,
  };
}
