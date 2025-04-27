// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { convertBenefitJsonToRes } from '../type/converter';
import { useState } from 'react';
import { BenefitRequestDTO } from '../type/RequestDTO';

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

  const postBenefit = async (sponsorId: number): Promise<number | undefined> => {
    setIsLoading(true);
    try {
      const res = await privateAxios.post(`/sponsor/v1/benefits?sponsorId=${sponsorId}`);
      return res.data.result['benefitId'];
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '신규 혜택 생성 실패';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const patchBenefit = async (benefitId: number, benefit: BenefitRequestDTO): Promise<void> => {
    setIsLoading(true);
    try {
      await privateAxios.patch(`/sponsor/v1/benefits/${benefitId}`, benefit);
      if (benefit.status === 'PENDING') toast.success('임시 저장 완료');
      else toast.success('혜택 제출 완료');
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '임시 저장 실패';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBenefit = async (benefitId: number): Promise<void> => {
    try {
      await privateAxios.delete(`/sponsor/v1/benefits/${benefitId}`);
      toast.success('혜택 삭제 완료');
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '삭제 실패';
      toast.error(message);
    }
  };

  return { getBenefitList, postBenefit, patchBenefit, deleteBenefit, isLoading };
};
