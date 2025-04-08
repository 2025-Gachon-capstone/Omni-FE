import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { IoIosArrowDown } from 'react-icons/io';
import useDevice from '../../hooks/useDevice';

export const FirstSection = ({ scrollSection }: { scrollSection: () => void }) => {
  const { isMobile, isTablet } = useDevice();

  return (
    <Container>
      <Title size={isMobile ? '1.25rem' : isTablet ? '2rem' : '2.5rem'}>
        상품을 직접 구매해보세요!
      </Title>
      <Title size={isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2.75rem'}>
        <TitleBlue>Omni-Card</TitleBlue>가 당신의{' '}
        <TitleBlue>{isMobile && <br />}맞춤 혜택</TitleBlue>을 추천해드립니다.
      </Title>
      <ScrollButton isMobile={isMobile} onClick={scrollSection}>
        둘러보기 <IoIosArrowDown size={24} />
      </ScrollButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14.4% 5% 20% 5%;
  font-weight: 600;
  box-sizing: border-box;
`;

const Title = styled.div<{ size: string }>`
  font-size: ${(props) => props.size};
  text-align: center;
`;

const TitleBlue = styled.span`
  color: ${theme.color.main};
`;

{
  /** 둘러보기 스크롤버튼 */
}
const ScrollButton = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  padding: ${(props) => (props.isMobile ? '0.3rem 0.8rem' : '0.5rem 1rem')};
  margin-top: 2rem;
  border: 1px solid black;
  border-radius: 1rem;
  cursor: pointer;
  animation: motion 0.8s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(5px);
    }
  }
`;
