import { useEffect } from 'react';
import { useAuthStore } from '../../shared/store';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RoleRouteProps {
  allowedRole: 'USER' | 'SPONSOR' | 'ADMIN';
  message?: string;
}

const RoleRoute = ({ allowedRole, message }: RoleRouteProps) => {
  const navigate = useNavigate();
  const userRole = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    if (userRole !== allowedRole) {
      toast(message || '접근 권한이 없습니다.');
      navigate(-1);
    }
  }, [userRole, allowedRole, message, navigate]);

  return userRole === allowedRole ? <Outlet /> : null;
};

export default RoleRoute;
