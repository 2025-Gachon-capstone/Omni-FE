import { useEffect, useState } from 'react';
import { publicAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { Category } from '../type/ProductList';

/** 상품 카테고리 가져오기  */
export const useGetGategory = (): { loading: boolean; data: Category[] } => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Category[]>([]); // 카테고리 데이터

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await publicAxios.get('/sponsor/v1/productCategories');
        const categories = result.data.result || [];
        setData([{ productCategoryId: 0, name: '전체보기' }, ...categories]);
      } catch (err: any) {
        const message = err.response?.data?.message || '카테고리 불러오기 실패';
        toast.error(message);
        setData([{ productCategoryId: 0, name: '전체보기' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data };
};
