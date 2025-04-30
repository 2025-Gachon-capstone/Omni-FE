import { useState } from 'react';
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../app/customAxios';

interface Benefit {
  cardBenefitId: number;
  benefitId: number;
  title: string;
  sponsorName: string;
  targetProduct: string;
  discountRate: number;
  updatedAt: string;
  endDate: string;
  status: string;
}

export const useApplyBenefit = () => {
  const [loading, setLoading] = useState(false);

  const applyBenefit = async (cardNumber: string): Promise<Benefit[] | null> => {
    setLoading(true);
    try {
      const res = await publicAxios.post('/card/v1/cardBenefits/check', { cardNumber });
      return res.data.result;
    } catch (err: any) {
      const message = err.response?.data?.message || '혜택 적용 실패';
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { applyBenefit, loading };
};
