import { useState } from 'react';
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../app/customAxios';
import { StatisticsData } from '../type/StatisticsType';

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

  // (GET) 상품 통계리포트 조회
  const getProductsReport = async ({
    productId,
  }: {
    productId: number;
  }): Promise<StatisticsData> => {
    setIsLoading(true);
    try {
      const result = await privateAxios.get(`/flask/v1/products/${productId}/statistics`);
      return result.data.result;
    } catch (err: any) {
      toast.error('데이터를 불러오는데 실패했습니다.');
      return {
        reordered: [],
        orderHour: [],
        orderDow: [],
        relatedProduct: [],
        report: '정보없음',
        period: { max: '0000.00.00', min: '0000.00.00' },
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { getProductsList, getProductsReport, isLoading };
};
