import { useState } from 'react';
import { publicAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { ProductList } from '../type/ProductList';

interface ProductListResponse {
  Items: ProductList[];
  totalElements: number;
  isFirst: boolean;
  last: boolean;
  pageSize: number;
}

/** 상품 데이터 가져오기  */
export const useGetProductList = () => {
  const [loading, setLoading] = useState(false);

  const getProductList = async ({
    page,
    size,
    productCategoryId,
  }: {
    page: number;
    size: number;
    productCategoryId?: number;
  }): Promise<ProductListResponse> => {
    setLoading(true);
    const params: any = {
      page: page,
      size: size,
    };

    if (productCategoryId) params.productCategoryId = productCategoryId;
    console.log('dngk', params);
    try {
      const res = await publicAxios.get('/sponsor/v1/products', { params });
      const data = res.data?.result;
      console.log(data);
      return {
        Items: data.products,
        totalElements: data.totalElements,
        isFirst: data.isFirst,
        last: data.last,
        pageSize: data.pageSize,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || '상품목록 가져오기 실패';
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

  return { loading, getProductList };
};
