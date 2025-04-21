import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicAxios } from '../../../app/customAxios';
import { setAccessToken } from '../../../shared/utils/tokenHandler';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../shared/store';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ id, password }: { id: string; password: string }) => {
    setIsLoading(true);
    try {
      const body = {
        loginId: id,
        password: password,
      };
      const res = await publicAxios.post('/user/v1/auth/login', body, { withCredentials: true });
      // 토큰 저장
      const accessToken = res.headers['authorization']?.split(' ')[1];
      setAccessToken(accessToken);
      // 사용자 정보 저장
      const user = res.data.result;
      setAuth({ isLoggedIn: true, user }); // 로그인 상태 저장
      navigate('/');
    } catch (err: any) {
      console.log(err.response.data);
      const message = err.response?.data?.message || '로그인 실패';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
