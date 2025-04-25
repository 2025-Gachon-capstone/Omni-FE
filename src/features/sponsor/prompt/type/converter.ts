import { BenefitFormData } from './FormDataType';
import { BenefitRequestDTO } from './RequestDTO';
import { BenefitResponseDTO } from './ResponseDTO';

export function convertJsonToBenefitResponseDTO(json: any): BenefitResponseDTO {
  return {
    benefitId: json.benefitId,
    title: json.title,
    startDate: new Date(json.startDate),
    endDate: new Date(json.endDate),
    discounRate: json.discounRate,
    targetProduct: json.targetProduct,
    amount: json.amount,
    targetMember: json.targetMember,
    status: json.status,
  };
}

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
