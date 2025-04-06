/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import theme from './../../styles/theme';
import { FiX } from 'react-icons/fi';
import useDevice from '../../hooks/useDevice';

interface Menu {
  name: string[];
  link: string[];
}

interface MenuListType {
  GUEST: Menu;
  USER: Menu;
  MANAGER: Menu;
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
    link: ['/', '/card', '/payment', '/benefit', '/mypage'],
  },
  MANAGER: {
    name: ['홈', '전체 유저 관리', '전체 결제내역'],
    link: ['/', '/users', '/payments'],
  },
  SPONSOR: {
    name: ['홈', '협찬하기', '발행내역'],
    link: ['/', '/sponsor', '/publish'],
  },
  SHOPPER: {
    name: ['쇼핑하기', '장바구니', 'Omni 카드'],
    link: ['/shop', '/shop/cart', '/'],
  },
};

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: () => void }) => {
  const ROLE = location.pathname.startsWith('/shop') ? 'SHOPPER' : 'GUEST'; // 임시 역할 부여
  const { isMobile } = useDevice();

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        right: 0;
        width: ${isMobile ? '100vw' : '30%'};
        height: 100vh;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        background-color: ${theme.color.main};
        z-index: 1000;
        transform: translateX(${isOpen ? '0' : '100%'});
        transition: transform 0.5s ease-in-out;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          margin-right: auto;
        `}
      >
        <FiX style={{ cursor: 'pointer' }} size={40} color={'white'} onClick={setIsOpen} />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-grow: 1;
          margin-top: -5rem;
        `}
      >
        {MenuList[ROLE].name.map((menuName, index) => (
          <div>
            <Link
              to={MenuList[ROLE].link[index]}
              onClick={setIsOpen}
              key={index}
              css={css`
                color: white;
                font-size: ${isMobile ? '1.2rem' : '1.6rem'};
                text-decoration: none;
                position: relative;
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
              `}
            >
              {menuName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
