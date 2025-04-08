/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { Fade } from 'react-awesome-reveal';
import useDevice from '../../../shared/hooks/useDevice';
import Bubble from './Bubble';

export const SecondSection = ({ ref }: { ref: React.ForwardedRef<HTMLDivElement> }) => {
  const { isMobile, isTablet } = useDevice();

  return (
    <Container ref={ref}>
      <Title
        size={isMobile ? '1.15rem' : isTablet ? '1.75rem' : '2.5rem'}
        weight={isMobile ? 600 : 700}
      >
        <Fade delay={300} duration={500} cascade damping={0.1} triggerOnce>
          이런 고민 한번쯤 해보시지 않으셨나요?
        </Fade>
      </Title>
      <Body width={isMobile ? '90%' : '60%'}>
        <Fade direction="up" delay={1} cascade damping={0.4}>
          <Bubble direction="left">
            <span>
              흩어져 있는 카드 혜택을 위해
              <br />
              <span style={{ color: `${theme.color.main}` }}>&nbsp;쓸데없이 많은 카드</span>를
              발급받지 않으셨나요?
            </span>
          </Bubble>
          <Bubble direction="right">
            <span>
              기껏 발급받은 카드의
              <span style={{ color: `${theme.color.main}` }}>&nbsp;혜택을 잊고계시진</span>
              않나요?
            </span>
          </Bubble>
        </Fade>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.color.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7% 5% 15% 5%;
  font-weight: 600;
  box-sizing: border-box;
`;
const Title = styled.div<{ size: string; weight: number }>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: white;
  margin-bottom: 10%;
`;
const Body = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: ${(props) => props.width};
`;
