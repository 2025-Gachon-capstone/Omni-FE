/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { FiMenu } from 'react-icons/fi';
import Logo from '/logo.svg';
import Sidebar from './Sidebar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        css={css`
          padding: 2.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        `}
      >
        {/* 로고 (쇼핑탭에서는 삭제) */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          `}
        >
          {!location.pathname.startsWith('/shop') && <img src={Logo} alt="Logo" width={40} />}
        </div>
        {/* 메뉴 아이콘 */}
        <div
          css={css`
            position: absolute;
            right: 3%;
            cursor: pointer;
          `}
        >
          <FiMenu size={30} onClick={handleMenuToggle} />
        </div>
      </header>
      <Sidebar isOpen={isMenuOpen} setIsOpen={handleMenuToggle} />
    </>
  );
}

export default Header;
