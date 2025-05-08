import { useState } from 'react';
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../app/customAxios';

export const usePostOrder = () => {
  const [loading, setLoading] = useState(false);

  const postOrder = async (body: {
    cardNumber: string;
    orderName: string;
    items: { productId: number; quantity: number; addToCartOrder: number }[];
    orderPrice: number;
  }): Promise<{ orderCode: string | null }> => {
    setLoading(true);
    try {
      const res = await publicAxios.post('/payment/v1/orders', body);
      return { orderCode: res.data.result.orderCode };
    } catch (err: any) {
      const message = err.response?.data?.message || '주문 생성 실패';
      toast.error(message);
      return { orderCode: null };
    } finally {
      setLoading(false);
    }
  };

  return { loading, postOrder };
};
