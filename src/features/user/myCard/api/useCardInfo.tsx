import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { Card } from '../type/Card';
import { toast } from 'react-toastify';

export const useCardInfo = () => {
  const [loading, setLoading] = useState(false);

  // 카드번호 인증 API
  const verifyCard = async (password: string): Promise<{ isSuccess: boolean; message: string }> => {
    let result = { isSuccess: false, message: '' };
    setLoading(true);
    try {
      const res = await privateAxios.post('/card/v1/cards/verify', { cardPassword: password });
      result = { isSuccess: res.data.isSuccess, message: '인증에 성공하였습니다.' };
    } catch (err: any) {
      result = { isSuccess: false, message: err.response?.data?.message || '인증에 실패했습니다.' };
    } finally {
      setLoading(false);
      return result;
    }
  };

  // 카드정보 가져오기 API
  const getCardInfo = async (): Promise<{ isSuccess: boolean; data: null | Card }> => {
    let result = { isSuccess: false, data: null };
    setLoading(true);
    try {
      const res = await privateAxios.get('/card/v1/my/cards');
      result = { isSuccess: res.data.isSuccess, data: res.data.result };
    } catch (err: any) {
      result = { isSuccess: false, data: null };
      toast.error(err.response?.data?.message || '카드불러오기에 실패했습니다.');
    } finally {
      setLoading(false);
      return result;
    }
  };

  return {
    loading,
    verifyCard,
    getCardInfo,
  };
};
