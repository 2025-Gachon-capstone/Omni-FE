import { useEffect } from 'react';
import { useAuthStore } from '../../shared/store';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../shared/utils/tokenHandler';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isLoggedIn && accessToken === '') {
      if (!['/login', '/join'].includes(location.pathname)) {
        toast('로그인 후에 접근 가능한 페이지입니다.');
      }
      navigate('/', { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
