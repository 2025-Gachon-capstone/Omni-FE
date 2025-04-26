// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { BenefitRequestDTO } from '../type/RequestDTO';

export const patchBenefit = async (
  benefitId: number,
  benefit: BenefitRequestDTO,
): Promise<void> => {
  try {
    await privateAxios.patch(`/sponsor/v1/benefits/${benefitId}`, benefit);
    if (benefit.status === 'PENDING') toast.success('임시 저장 완료');
    else toast.success('혜택 제출 완료');
  } catch (err: any) {
    console.log(err.response.data);
    const message = err.response?.data?.message || '임시 저장 실패';
    toast.error(message);
  }
};
