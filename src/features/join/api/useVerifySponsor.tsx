import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

// (협찬사) 사업자 인증 API
export const useVerifySponsor = () => {
  const [loading, setLoading] = useState(false);

  const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${
    import.meta.env.VITE_VERIFY_SPONSOR_API_KEY
  }`;

  const verifySponsor = async (bNumber: string) => {
    setLoading(true);
    let form = {
      b_no: [bNumber],
    };
    try {
      const result = await axios.post(url, form);
      console.log(result);
      if (result.data.data[0].b_stt_cd === '01') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error('사업자인증 중 오류가 발생했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verifySponsor, loading };
};
