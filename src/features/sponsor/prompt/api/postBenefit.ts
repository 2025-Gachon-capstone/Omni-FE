// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';

export const postBenefit = async (sponsorId: number): Promise<number | undefined> => {
  try {
    const res = await privateAxios.post(`/sponsor/v1/benefits?sponsorId=${sponsorId}`);
    return res.data.result['benefitId'];
  } catch (err: any) {
    console.log(err.response.data);
    const message = err.response?.data?.message || '신규 혜택 생성 실패';
    toast.error(message);
  }
};
