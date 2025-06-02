// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { convertBenefitJsonToRes } from '../type/converter';
import { useState } from 'react';
import { BenefitRequestDTO } from '../type/RequestDTO';
import { BenefitResponseDTO } from '../type/ResponseDTO';

export const useBenefitList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getBenefitList = async ({ sponsorId }: { sponsorId: number }) => {
    setIsLoading(true);
    try {
      const res = await privateAxios.get(`/flask/v1/benefits?sponsorId=${sponsorId}`);
      console.log(res.data.result);

      return res.data.result.reduce((acc: BenefitResponseDTO[], json: any) => {
        if (json.status !== 'DELETED') {
          acc.push(convertBenefitJsonToRes(json));
        }
        return acc;
      }, []);
    } catch (err: any) {
      console.log('err:', err);

      if (err.response) {
        console.log('Server responded with error:', err.response.data);
        const message = err.response.data?.message || '혜택내역 조회 실패';
        toast.error(message);
      } else if (err.request) {
        console.log('No response received:', err.request);
        toast.error('서버로부터 응답이 없습니다.');
      } else {
        console.log('Error setting up request:', err.message);
        toast.error('요청 설정 중 문제가 발생했습니다.');
      }
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

  const patchBenefit = async (benefitId: number, benefit: BenefitRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      await privateAxios.patch(`/sponsor/v1/benefits/${benefitId}`, benefit);
      if (benefit.status === 'PENDING') toast.success('임시 저장 완료');
      return true
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '임시 저장 실패';
      toast.error(message);
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const submitBenefit = async (benefitId: number, benefit: BenefitRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      await privateAxios.patch(`/sponsor/v1/benefits/${benefitId}`, benefit);
      await privateAxios.post(`/flask/v1/benefits/${benefitId}/submit`, benefit);
      toast.success('혜택 제출 완료');
      return true;
    } catch (err: any) {
      console.log(err.response.data);
      benefit.status = 'PENDING';
      await privateAxios.patch(`/sponsor/v1/benefits/${benefitId}`, benefit);
      const message = err.response?.data?.message || '혜택 제출 실패';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBenefit = async (benefitId: number): Promise<boolean> => {
    try {
      await privateAxios.delete(`/sponsor/v1/benefits/${benefitId}`);
      toast.success('혜택 삭제 완료');
      return true
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '삭제 실패';
      toast.error(message);
      return false
    }
  };

  return { getBenefitList, postBenefit, patchBenefit, submitBenefit, deleteBenefit, isLoading };
};
