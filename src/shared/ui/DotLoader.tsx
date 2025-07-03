import styled from '@emotion/styled';
import theme from '../styles/theme';
import { keyframes } from '@emotion/react';

const DotLoader = () => {
  return (
    <Wrapper>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </Wrapper>
  );
};

export default DotLoader;

const wave = keyframes`
  0%,80%,100%{
    transform: translateY(0);
  }
  40%{
    transform: translateY(1rem);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;
const Dot = styled.div<{ delay: string }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${theme.color.main};
  animation: ${wave} 1s infinite ease-in;
  animation-delay: ${({ delay }) => delay};
`;
