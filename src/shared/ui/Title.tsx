import styled from '@emotion/styled';
import useDevice from '../hooks/useDevice';

const StyledTitle = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .main-title {
    font-size: ${(props) => (props.isMobile ? '1.5rem' : '2rem')};
    font-weight: 600;
  }
  .sub-title {
    font-size: ${(props) => (props.isMobile ? '0.8rem' : '1rem')};
    font-weight: 400;
    color: #595959;
  }
`;

const Title = ({ main, sub }: { main: string; sub: string }) => {
  const { isMobile } = useDevice();
  return (
    <StyledTitle isMobile={isMobile}>
      <div className="main-title">{main}</div>
      <div className="sub-title">{sub}</div>
    </StyledTitle>
  );
};

export default Title;
