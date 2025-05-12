import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '../../shared/styles/theme';
import { FiX } from 'react-icons/fi';
import useDevice from '../../shared/hooks/useDevice';
import { useAuthStore } from '../../shared/store';
import { useLogout } from '../../shared/hooks/useLogout';
import Loading from '../../pages/Loading';

interface Menu {
  name: string[];
  link: string[];
}
interface MenuListType {
  GUEST: Menu;
  USER: Menu;
  ADMIN: Menu;
  SPONSOR: Menu;
  SHOPPER: Menu;
}
const MenuList: MenuListType = {
  GUEST: {
    name: ['홈', '쇼핑하기', '로그인/회원가입'],
    link: ['/', '/shop', '/login'],
  },
  USER: {
    name: ['홈', 'MY카드', '결제내역', '혜택 히스토리', '마이페이지'],
    link: ['/', '/mycard', '/payment', '/benefit', '/mypage'],
  },
  ADMIN: {
    name: ['홈', '전체 유저 관리', '전체 결제내역'],
    link: ['/', '/manage/cards', '/manage/payments'],
  },
  SPONSOR: {
    name: ['홈', '협찬하기', '발행내역'],
    link: ['/', '/sponsor/prompt', '/sponsor/benefit'],
  },
  SHOPPER: {
    name: ['쇼핑하기', '장바구니', 'Omni 카드'],
    link: ['/shop', '/shop/cart', '/'],
  },
};

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: () => void }) => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const { logout, isLoading } = useLogout();
  const userRole = useAuthStore((state) => state.user?.role || 'GUEST');

  const ROLE: 'GUEST' | 'USER' | 'SPONSOR' | 'ADMIN' | 'SHOPPER' = location.pathname.startsWith(
    '/shop',
  )
    ? 'SHOPPER'
    : userRole; // 쇼핑여부

  return isLoading ? (
    <Loading />
  ) : (
    <SidebarContainer isMobile={isMobile} isOpen={isOpen}>
      <div className="closeBtn">
        <FiX size={40} color={'white'} onClick={() => setIsOpen()} />
      </div>
      <MenuItems>
        {MenuList[ROLE].name.map((menuName, index) => (
          <div>
            <MenuItem
              isMobile={isMobile}
              key={index}
              onClick={() => {
                setIsOpen();
                navigate(`${MenuList[ROLE].link[index]}`);
              }}
            >
              {menuName}
            </MenuItem>
          </div>
        ))}
        {ROLE !== 'GUEST' && ROLE !== 'SHOPPER' && (
          <MenuItem
            isMobile={isMobile}
            onClick={() => {
              setIsOpen();
              logout();
            }}
          >
            로그아웃
          </MenuItem>
        )}
      </MenuItems>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div<{ isMobile: boolean; isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${(props) => (props.isMobile ? '100vw' : '30%')};
  height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.main};
  z-index: 1000;
  transform: ${(props) => `translateX(${props.isOpen ? '0' : '100%'})`};
  transition: transform 0.5s ease-in-out;
  box-sizing: border-box;

  .closeBtn {
    margin-right: auto;
    z-index: 10;
    cursor: pointer;
    transform: rotateZ(0);
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-grow: 1;
  margin-top: -5rem;
`;

const MenuItem = styled.div<{ isMobile: boolean }>`
  color: white;
  font-size: ${(props) => (props.isMobile ? '1.2rem' : '1.6rem')};
  text-decoration: none;
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;
