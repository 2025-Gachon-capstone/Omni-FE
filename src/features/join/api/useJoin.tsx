import { useState } from 'react';
import { publicAxios } from '../../../app/customAxios';
import { toast } from 'react-toastify';

type SignupProps = <T>(isSponsor: boolean, body: T) => Promise<boolean>;

export const useJoin = () => {
  const [loading, setLoading] = useState(false);

  const signup: SignupProps = async (isSponsor, body) => {
    setLoading(true);
    try {
      await publicAxios.post(
        !isSponsor ? '/user/v1/auth/signup/normal' : '/user/v1/auth/signup/sponsor',
        body,
      );
      return true;
    } catch (err: any) {
      console.log(err);
      const message = err.response?.data?.message || '회원가입에 실패했습니다';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};
