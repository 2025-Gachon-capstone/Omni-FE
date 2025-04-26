// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { convertBenefitJsonToRes } from '../type/converter';
import { useState } from 'react';

export const useBenefitList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getBenefitList = async ({ sponsorId }: { sponsorId: number }) => {
    setIsLoading(true);
    try {
      const res = await privateAxios.get(`/flask/v1/benefits?sponsorId=${sponsorId}`);
      console.log(res.data.result);
      return res.data.result.map(convertBenefitJsonToRes);
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '혜택내역 조회 실패';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getBenefitList, isLoading };
};
