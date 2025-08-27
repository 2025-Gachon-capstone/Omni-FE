import { useState } from 'react';
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../app/customAxios';

interface Product {
  productId: number;
  productName: string;
}

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);

  // (GET) 상품 목록 조회
  const getProductsList = async ({ sponsorId }: { sponsorId: number }): Promise<Product[]> => {
    setIsLoading(true);
    try {
      const result = await privateAxios.get(`/flask/v1/products`, { params: { sponsorId } });
      return result.data.result.products;
    } catch (err: any) {
      toast.error('상품목록을 불러오는데 실패했습니다.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { getProductsList, isLoading };
};
