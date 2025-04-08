/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useDevice from '../../hooks/useDevice';
import { RouterButton } from './RouterButton';

export const FifthSection = () => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const isLogin = false; // 로그인 여부 (임시)

  return (
    <Container isMobile={isMobile}>
      <div className="title">나만의 혜택을 더 알아보고싶다면?</div>
      <div className="btn-box">
        {!isLogin && <RouterButton text="로그인 및 회원가입" onClick={() => navigate('/login')} />}
        <RouterButton text="쇼핑하러가기" onClick={() => navigate('/shop')} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  background: rgba(10, 98, 208, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.isMobile ? '2rem' : '3.75rem')};
  padding: 13% 5%;
  box-sizing: border-box;

  .title {
    font-weight: 600;
    font-size: ${(props) => (props.isMobile ? '1.3rem' : '2.5rem')};
    color: white;
  }
  .btn-box {
    display: flex;
    gap: 2.5rem;
  }
`;
