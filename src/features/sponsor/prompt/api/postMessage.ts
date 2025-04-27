// 예시: axios 사용
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { convertMessageJsonToDto, convertMessageToReq } from '../type/converter';
import { MessageDTO } from '../type/ResponseDTO';

export const postMessage = async (
  benefitId: number,
  message: MessageDTO,
  setInput: (value: React.SetStateAction<string>) => void,
): Promise<MessageDTO | undefined> => {
  try {
    const res = await privateAxios.post(
      `/flask/v1/benefits/${benefitId}/messages`,
      convertMessageToReq(message),
    );
    setInput('');
    return convertMessageJsonToDto(res.data.result);
  } catch (err: any) {
    console.log(err.response.data);
    const message = err.response?.data?.message || '채팅 입력 실패';
    toast.error(message);
    setInput(message.content);
  }
};
