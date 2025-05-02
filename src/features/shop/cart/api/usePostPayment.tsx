import { useState } from 'react';
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../app/customAxios';

export const usePostPayment = () => {
  const [loading, setLoading] = useState(false);

  const postPayment = async (body: {
    orderCode: string;
    paymentKey: string;
    totalPrice: number;
  }) => {
    setLoading(true);
    try {
      await publicAxios.post('/payment/v1/payments/confirm', body);
    } catch (err: any) {
      const message = err.response?.data?.message || '결제 인증 실패';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postPayment };
};
