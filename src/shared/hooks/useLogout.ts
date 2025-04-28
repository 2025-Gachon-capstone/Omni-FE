import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useState } from 'react';
import { privateAxios } from '../../app/customAxios';
import { removeAccessToken } from '../utils/tokenHandler';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      await privateAxios.post('/user/v1/auth/logout', null, { withCredentials: true });
      removeAccessToken(); // 토큰 제거
      clearAuth(); // Zustand 상태 초기화
      toast.info('로그아웃 되었습니다.');
      navigate('/login');
    } catch (err: any) {
      console.log(err.response.data);
      // 이미 서버에 리프레시 토큰이 삭제된 경우
      if (err.response.data.code === 'TOKEN4001' || err.response.data.code === 'TOKEN4004') {
        removeAccessToken(); // 토큰 제거
        clearAuth(); // Zustand 상태 초기화
        toast.info('로그아웃 되었습니다.');
        navigate('/login'); // 로그인 페이지로 이동
      }
      // 그 외의 에러 처리
      else {
        const message = err.response?.data?.message || '로그아웃 실패';
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
