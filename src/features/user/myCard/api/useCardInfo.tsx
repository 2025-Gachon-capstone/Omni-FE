import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { Card, CardPreview } from '../type/Card';

export const useCardInfo = () => {
  const [loading, setLoading] = useState(false);

  // 카드 생성 API
  const createNewCard = async (
    password: string,
  ): Promise<{ isSuccess: boolean; message: string }> => {
    let result = { isSuccess: false, message: '' };
    setLoading(true);
    try {
      const res = await privateAxios.post('/card/v1/cards/self', { cardPassword: password });
      result = {
        isSuccess: res.data.isSuccess,
        message: '새로운 카드가 추가되었습니다.',
      };
    } catch (err: any) {
      result = {
        isSuccess: false,
        message: err.response?.data?.message || '카드 추가에 실패했습니다.',
      };
    } finally {
      setLoading(false);
      return result;
    }
  };

  // 카드 리스트 API
  const getCardList = async (
    page: number,
  ): Promise<{
    isSuccess: boolean;
    message: string;
    data: CardPreview[] | null;
    last: boolean;
  }> => {
    console.log(page);
    let result = { isSuccess: false, data: null, last: true, message: '' };
    setLoading(true);
    try {
      const res = await privateAxios.get('/card/v1/my/cards', { params: { page } });
      result = {
        isSuccess: res.data.isSuccess,
        data: res.data.result.cards,
        last: res.data.result.last,
        message: '',
      };
    } catch (err: any) {
      result = {
        isSuccess: false,
        data: null,
        last: true,
        message: '카드불러오기에 실패했습니다.',
      };
    } finally {
      setLoading(false);
      return result;
    }
  };

  // 카드번호 인증 API (반환값 : 카드 상세정보)
  const verifyCard = async ({
    cardId,
    password,
  }: {
    cardId: number;
    password: string;
  }): Promise<{ isSuccess: boolean; message: string; data: Card | null }> => {
    let result = { isSuccess: false, message: '', data: null };
    setLoading(true);
    try {
      const res = await privateAxios.post(`/card/v1/cards/${cardId}`, { cardPassword: password });
      result = {
        isSuccess: res.data.isSuccess,
        message: '인증에 성공하였습니다.',
        data: res.data.result,
      };
    } catch (err: any) {
      result = {
        isSuccess: false,
        message: err.response?.data?.message || '인증에 실패했습니다.',
        data: null,
      };
    } finally {
      setLoading(false);
      return result;
    }
  };

  return {
    loading,
    createNewCard, // 카드 생성
    getCardList, // 카드 리스트
    verifyCard, // 카드 비밀번호 인증 & 카드 상세정보
  };
};
