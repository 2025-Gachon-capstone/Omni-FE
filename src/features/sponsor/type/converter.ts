import { BenefitFormData } from './FormDataType';
import { BenefitRequestDTO } from './RequestDTO';
import { BenefitResponseDTO } from './ResponseDTO';

export function benefitResponseDTOToFormData(dto: BenefitResponseDTO): BenefitFormData {
  const { benefitId, status, ...formData } = dto; // 필요 없는 필드 제거
  return formData;
}

export const benefitFormToRequestDTO = (
  formData: BenefitFormData,
  status: 'PENDING' | 'DELETED' | 'COMPLETED',
): BenefitRequestDTO => ({
  ...formData,
  status,
});
