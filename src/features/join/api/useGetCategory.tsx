import { useEffect, useState } from 'react';
import { publicAxios } from '../../../app/customAxios';
import { toast } from 'react-toastify';

export interface CategoryItem {
  categoryId: number;
  title: string;
}

export const useGetCategory = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await publicAxios.get('/sponsor/v1/categories');
        const data = res.data.result;
        setCategories(data);
      } catch (err: any) {
        const message = err.response?.data?.message || '카테고리를 불러오는데 실패했습니다.';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return { categories, loading };
};
