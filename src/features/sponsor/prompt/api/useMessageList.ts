// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import {
  convertBenefitResToReq,
  convertMessageJsonToDto,
  convertMessageJsonToRes,
  convertMessageToReq,
} from '../type/converter';
import { useState } from 'react';
import { BenefitResponseDTO, MessageDTO } from '../type/ResponseDTO';

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

  const postMessage = async (
    benefitId: number,
    benefit: BenefitResponseDTO,
    message: MessageDTO,
    setInput: (value: React.SetStateAction<string>) => void,
  ): Promise<MessageDTO | undefined> => {
    setIsMessageLoading(true);

    const startTime = Date.now(); // 요청 시작 시간 기록
    try {
      const benefitReq = convertBenefitResToReq(benefit);
      const res = await privateAxios.post(
        `/flask/v1/benefits/${benefitId}/messages`,
        convertMessageToReq(message, benefitReq),
      );
      setInput('');
      return convertMessageJsonToDto(res.data.result);
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '채팅 입력 실패';
      toast.error(message);
      setInput(message.content);
    } finally {
      setIsMessageLoading(false);
      const endTime = Date.now(); // 요청 끝난 시간 기록
      console.log(`⏱️ postMessage API 호출 소요시간: ${(endTime - startTime) / 1000}s`);
    }
  };

  return { getMessageList, postMessage, isMessageLoading };
};
