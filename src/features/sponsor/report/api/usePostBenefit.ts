import { useState } from 'react';
import { useAuthStore } from '../../../../shared/store';
import { CustomBenefit } from '../type/CustomBenefit';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../app/customAxios';

type Response = {
  isSuccess: boolean;
  type: 'INVALID' | 'ERROR' | 'SUCCESS';
};

export const usePostBenefit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore((state) => state);

  const postBenefit = async ({
    data,
    productId,
  }: {
    data: CustomBenefit;
    productId: number;
  }): Promise<Response> => {
    if (!data || !user?.sponsorId) {
      toast.error('잘못된 요청입니다.');
      return { isSuccess: false, type: 'INVALID' };
    }

    const request = {
      reorderedRatio: data.reorderRatio,
      excludedProductIdList: data.excludeProductIdList.map((product) => Number(product.productId)),
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
      const result = await privateAxios.post(`/flask/v2/benefits`, request, {
        params: {
          sponsorId: user.sponsorId,
        },
      });
      return { isSuccess: result.data.isSuccess, type: 'SUCCESS' };
    } catch (err: any) {
      return { isSuccess: false, type: 'ERROR' };
    } finally {
      setIsLoading(false);
    }
  };

  return { postBenefit, isLoading };
};

export default usePostBenefit;
