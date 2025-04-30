import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';

export const useWithDrawal = () => {
  const [loading, setLoading] = useState(false);

  // 회원탈퇴 API
  const deleteUser = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await privateAxios.delete('/user/v1/auth/resign', {
        withCredentials: true,
      });
      return res.data.isSuccess;
    } catch (err: any) {
      const message = err.response?.data?.message || '탈퇴 실패';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};
