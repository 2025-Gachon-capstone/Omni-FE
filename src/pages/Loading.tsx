import styled from '@emotion/styled';
import theme from '../shared/styles/theme';

const Loading = ({ description }: { description?: string }) => {
  return (
    <SpinnerWrapper>
      <Spinner />
      <div style={{ fontWeight: 500, fontSize: '1.25rem' }}>{description}</div>
    </SpinnerWrapper>
  );
};

export default Loading;

const SpinnerWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #3e3e3e;
  background-color: rgba(255, 255, 255, 0.4);
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${theme.color.main};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
