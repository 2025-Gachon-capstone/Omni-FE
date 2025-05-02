import { useEffect } from 'react';
import { useAuthStore } from '../../shared/store';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../shared/utils/tokenHandler';

const PublicRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && token) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, token, navigate]);

  return !isLoggedIn ? <Outlet /> : null;
};

export default PublicRoute;
