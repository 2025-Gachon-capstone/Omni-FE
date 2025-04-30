import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { PaymentResDto } from '../type/Payment';

interface PaymentListResponse {
  Items: PaymentResDto[];
  totalElements: number;
  isFirst: boolean;
  last: boolean;
  pageSize: number;
}

export const usePaymentList = () => {
  const [loading, setLoading] = useState(false);

  // 결제내역 API
  const getPaymentList = async ({
    page,
    size,
    startDate,
    endDate,
    orderName,
  }: {
    page: number;
    size: number;
    startDate?: string;
    endDate?: string;
    orderName?: string;
  }): Promise<PaymentListResponse> => {
    setLoading(true);
    const params: any = {
      page,
      size,
    };

    // 선택 파라미터 조건부 추가
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (orderName) params.orderName = orderName;

    try {
      const res = await privateAxios.post('/payment/v1/my/payments', { params });
      const data = res.data?.result;

      return {
        Items: data.orderItems ?? [],
        totalElements: data.totalElements,
        isFirst: data.isFirst,
        last: data.last,
        pageSize: data.pageSize,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || '결제 내역 불러오기 실패';
      toast.error(message);
      return {
        Items: [],
        totalElements: 0,
        isFirst: true,
        last: false,
        pageSize: size,
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, getPaymentList };
};
