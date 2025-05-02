import { useEffect, useState } from 'react';
import { publicAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';

/** 상품 상세페이지 가져오기  */
export const useGetProductDetail = (
  productId: number | null,
): { loading: boolean; data: ProductItem | null } => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!productId) throw new Error('해당 상품내역이 없습니다.');
        const result = await publicAxios.get(`/sponsor/v1/products/${productId}`);
        setData(result.data.result);
      } catch (err: any) {
        const message = err.response?.data?.message || '상품내역 불러오기 실패';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data };
};
