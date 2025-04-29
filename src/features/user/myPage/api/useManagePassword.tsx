import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';

type PasswordProps = {
  current: string;
  new: string;
  confirm: string;
};

export const useManagePassword = () => {
  const [loading, setLoading] = useState(false);

  // 현재 비밀번호 확인 API
  const checkPassword = async (password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await privateAxios.post('/user/v1/auth/password/verify', { password: password });
      return res.data.isSuccess;
    } catch (err: any) {
      const message = err.response?.data?.message || '인증 실패';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 수정 API
  const modifyPassword = async (password: PasswordProps): Promise<boolean> => {
    setLoading(true);

    let body = {
      password: password.current,
      newPassword: password.new,
      eqNewPassword: password.confirm,
    };

    try {
      const res = await privateAxios.put('/user/v1/auth/members', body);
      return res.data.isSuccess;
    } catch (err: any) {
      const message = err.response?.data?.message || '수정 실패';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkPassword, modifyPassword };
};
