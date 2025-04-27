// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { convertMessageJsonToRes } from '../type/converter';
import { useState } from 'react';

export const useMessageList = () => {
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const getMessageList = async ({
    benefitId,
    page = 1,
    size = 30,
  }: {
    benefitId: number;
    page?: number;
    size?: number;
  }) => {
    setIsMessageLoading(true);

    try {
      const res = await privateAxios.get(
        `/flask/v1/benefits/${benefitId}/messages?page=${page}&size=${size}`,
      );
      console.log(res.data.result);
      return convertMessageJsonToRes(res.data.result);
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '채팅내역 조회 실패';
      toast.error(message);
    } finally {
      setIsMessageLoading(false);
    }
  };

  return { getMessageList, isMessageLoading };
};
