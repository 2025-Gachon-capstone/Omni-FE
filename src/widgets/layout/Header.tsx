import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiMenu } from 'react-icons/fi';
import Logo from '/logo.svg';
import Sidebar from './Sidebar';
import { useHeaderStore } from '../../shared/store';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderContainer ref={headerRef}>
        {/* 로고 (쇼핑탭에서는 삭제) */}
        <LogoBox>
          {!location.pathname.startsWith('/shop') && (
            <img src={Logo} alt="Logo" width={40} onClick={() => navigate('/')} />
          )}
        </LogoBox>
        {/* 메뉴 아이콘 */}
        <MenuBox>
          <FiMenu size={30} onClick={handleMenuToggle} />
        </MenuBox>
      </HeaderContainer>
      <Sidebar isOpen={isMenuOpen} setIsOpen={handleMenuToggle} />
    </>
  );
}

export default Header;

const HeaderContainer = styled.div`
  padding: 2.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const MenuBox = styled.div`
  position: absolute;
  right: 3%;
  cursor: pointer;
`;
