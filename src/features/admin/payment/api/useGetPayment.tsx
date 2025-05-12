import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { TotalPaymentResDto } from '../type/TotalPayment';

interface UserCardListResponse {
  payments: TotalPaymentResDto[];
  totalElements: number;
  isFirst: boolean;
  last: boolean;
  pageSize: number;
}

export const useGetPayment = () => {
  const [loading, setLoading] = useState(false);

  // 전체 결제 정보 가져오기 API
  const getTotalPaymentList = async ({
    page,
    size,
    startDate,
    endDate,
    loginId,
  }: {
    page: number;
    size: number;
    startDate?: string;
    endDate?: string;
    loginId?: string;
  }): Promise<UserCardListResponse> => {
    setLoading(true);

    const params: any = {
      page: page,
      size: size,
    };
    // 선택 파라미터 조건부 추가
    if (startDate !== undefined) params.startDate = startDate;
    if (endDate !== undefined) params.endDate = endDate;
    if (loginId !== undefined) params.loginId = loginId;

    try {
      const res = await privateAxios.get('/payment/v1/admin/payments', { params });
      const data = res.data?.result;
      return {
        payments: data.payments,
        totalElements: data.totalElements,
        isFirst: data.isFirst,
        last: data.last,
        pageSize: data.pageSize,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || '결제 정보 불러오기 실패';
      toast.error(message);
      return {
        payments: [],
        totalElements: 0,
        isFirst: true,
        last: false,
        pageSize: size,
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, getTotalPaymentList };
};
