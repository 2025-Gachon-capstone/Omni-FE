import { BenefitFormData } from './FormDataType';
import { BenefitRequestDTO, MesssageRequestDTO } from './RequestDTO';
import { BenefitResponseDTO, MessageDTO, MessageResponseDTO } from './ResponseDTO';

/** 혜택 컨버터 */
export function convertBenefitJsonToRes(json: any): BenefitResponseDTO {
  return {
    benefitId: json.benefitId,
    title: json.title,
    startDate: new Date(json.startDate),
    endDate: new Date(json.endDate),
    discounRate: json.discounRate * 100,
    targetProduct: json.targetProduct,
    amount: json.amount,
    targetMember: json.targetMember,
    status: json.status,
  };
}

export function convertBenefitResToForm(response: BenefitResponseDTO): BenefitFormData {
  const { benefitId, status, ...formData } = response; // 필요 없는 필드 제거
  return formData;
}

export function convertBenefitResToReq(response: BenefitResponseDTO): BenefitRequestDTO {
  return {
    ...response,
    startDate:
      response.startDate instanceof Date
        ? response.startDate.toISOString().split('T')[0]
        : response.startDate,
    endDate:
      response.endDate instanceof Date
        ? response.endDate.toISOString().split('T')[0]
        : response.endDate,
    discounRate: response.discounRate / 100,
  };
}

/** Message 컨버터 */
export function convertMessageJsonToDto(json: any): MessageDTO {
  return {
    chatMessageId: json.chatMessageId,
    authorType: json.authorType,
    content: json.content,
  };
}

export function convertMessageJsonToRes(json: any): MessageResponseDTO {
  return {
    hasPrev: json.hasPrev,
    hasNext: json.hasNext,
    currentPage: json.currentPage,
    messages: json.messages.map(convertMessageJsonToDto),
  };
}

export function convertMessageToReq(response: MessageDTO): MesssageRequestDTO {
  return {
    content: response.content,
  };
}
