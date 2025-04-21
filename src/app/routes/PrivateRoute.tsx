import { useEffect } from 'react';
import { useAuthStore } from '../../shared/store';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../shared/utils/tokenHandler';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isLoggedIn || accessToken === '') {
      navigate('/login', {
        replace: true,
      });
      toast('로그인이 필요한 페이지입니다.');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
