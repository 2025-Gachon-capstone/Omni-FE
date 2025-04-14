import styled from '@emotion/styled';
import theme from '../styles/theme';
import { useEffect } from 'react';
import useDevice from '../hooks/useDevice';

type ModalButton = {
  text: string;
  onClick: () => void;
  bgColor?: string; // 버튼 배경색 (선택)
  textColor?: string; // 버튼 텍스트 색 (선택)
  border?: string; // 버튼 테두리 색 (선택)
};

type ModalProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  buttons?: ModalButton[]; // 최대 2개
};

const Modal = ({ icon, children, buttons = [] }: ModalProps) => {
  const { isMobile } = useDevice();

  // body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container>
      <Content isMobile={isMobile}>
        <Header>{icon ?? <Space />}</Header>
        <Description>{children}</Description>
        <ButtonWrapper>
          {buttons.map((btn, idx) => (
            <ModalButton
              key={idx}
              onClick={btn.onClick}
              bgColor={btn.bgColor}
              textColor={btn.textColor}
              border={btn.border}
            >
              {btn.text}
            </ModalButton>
          ))}
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90vw;
  max-width: 16rem;
  padding: ${(props) => (props.isMobile ? '1.19rem 2.69rem' : '2rem 3.5rem')};

  background-color: white;
  border-radius: 0.25rem;
`;

const Header = styled.div`
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
`;

const ModalButton = styled.button<{ bgColor?: string; textColor?: string; border?: string }>`
  padding: 0.5rem 2rem;
  border-radius: 0.25rem;

  background-color: ${(props) => props.bgColor || `${theme.color.main}`};
  color: ${(props) => props.textColor || '#fff'};
  border: ${(props) => props.border || 'none'};
  font-size: 1rem;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const Description = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
`;

const Space = styled.div`
  width: 1rem;
  height: 1rem;
`;
