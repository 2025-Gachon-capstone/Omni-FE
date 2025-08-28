import { useState } from 'react';
import { useAuthStore } from '../../../../shared/store';
import { CustomBenefit } from '../type/CustomBenefit';
import dayjs from 'dayjs';

export const usePostBenefit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore((state) => state);

  const postBenefit = async ({ data, productId }: { data: CustomBenefit; productId: number }) => {
    if (!data || !user?.sponsorId) return;

    const request = {
      reorderRatio: data.reorderRatio,
      excludeProductIdList: data.excludeProductIdList.map((product) => Number(product.productId)),
      title: data.title,
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      discountRate: data.discount_rate / 100,
      amount: data.amount,
      status: data.status,
      targetProductId: productId,
    };

    setIsLoading(true);
    try {
      console.log(request);
      console.log('협찬사 id: ', user?.sponsorId);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return { postBenefit, isLoading };
};

export default usePostBenefit;
