// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';

export const deleteBenefit = async (benefitId: number): Promise<void> => {
  try {
    await privateAxios.delete(`/sponsor/v1/benefits/${benefitId}`);
    toast.success('혜택 삭제 완료');
  } catch (err: any) {
    console.log(err.response.data);
    const message = err.response?.data?.message || '삭제 실패';
    toast.error(message);
  }
};
