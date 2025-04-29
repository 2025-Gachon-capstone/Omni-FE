import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { Benefit } from '../type/Benefit';
import { toast } from 'react-toastify';

interface BenefitListResponse {
  benefits: Benefit[];
  totalElements: number;
  isFirst: boolean;
  last: boolean;
  pageSize: number;
}

export const useBenefitList = () => {
  const [loading, setLoading] = useState(false);

  // 혜택 가져오기 API
  const getBenefitList = async ({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<BenefitListResponse> => {
    setLoading(true);
    let body = {
      page: page,
      size: size,
    };
    try {
      const res = await privateAxios.get('/card/v1/my/cardBenefits', { params: body });
      const data = res.data?.result;

      return {
        benefits: data.cardBenefits,
        totalElements: data.totalElements,
        isFirst: data.isFirst,
        last: data.last,
        pageSize: data.pageSize,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || '혜택 불러오기 실패';
      toast.error(message);
      return {
        benefits: [],
        totalElements: 0,
        isFirst: true,
        last: false,
        pageSize: size,
      };
    } finally {
      setLoading(false);
    }
  };

  // 사용가능 혜택 가져오기 API
  const getAvailableBenefit = async (): Promise<Benefit[]> => {
    setLoading(true);
    try {
      const res = await privateAxios('/card/v1/my/cardBenefits/available');
      console.log(res);
      return res.data.result;
    } catch (err: any) {
      const message = err.response?.data?.message || '혜택 불러오기 실패';
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, getBenefitList, getAvailableBenefit };
};
