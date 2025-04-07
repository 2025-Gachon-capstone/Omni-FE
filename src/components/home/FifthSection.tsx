/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useDevice from '../../hooks/useDevice';

export const FifthSection = () => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const isLogin = true; // 로그인 여부 (임시)

  return (
    <div
      css={css`
        background: rgba(10, 98, 208, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: ${isMobile ? '2rem' : '3.75rem'};
        padding: 13% 5%;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          font-weight: 600;
          font-size: ${isMobile ? '1.3rem' : '2.5rem'};
          color: white;
        `}
      >
        나만의 혜택을 더 알아보고싶다면?
      </div>
      <div
        css={css`
          display: flex;
          gap: 2.5rem;
        `}
      >
        {!isLogin && <RouterBtn text="로그인 및 회원가입" onClick={() => navigate('/login')} />}
        <RouterBtn text="쇼핑하러가기" onClick={() => navigate('/shop')} />
      </div>
    </div>
  );
};

{
  /** 이동 버튼 컴포넌트 */
}
const RouterBtn = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const { isMobile } = useDevice();
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${isMobile ? '0.8rem' : '1.5rem'};
        color: white;
        border: 1px solid white;
        border-radius: ${isMobile ? '0.5rem' : '1rem'};
        padding: ${isMobile ? '0.25rem 0.5rem' : '0.5rem 1rem'};
        cursor: pointer;
      `}
    >
      {text}&nbsp;
      <IoArrowForwardCircleOutline size={`${isMobile ? '0.8rem' : '1.5rem'}`} />
    </div>
  );
};
