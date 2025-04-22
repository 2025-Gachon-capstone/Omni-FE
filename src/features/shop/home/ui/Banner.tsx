import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import useDevice from '../../../../shared/hooks/useDevice';

export const Banner = () => {
  const { isMobile, isTablet } = useDevice();

  return (
    <Container>
      <Title size={isMobile ? '1.25rem' : isTablet ? '2rem' : '2.5rem'}>
        상품을 직접 구매해보세요!
      </Title>
      <Title size={isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2.75rem'}>
        당신의 <TitleBlue>맞춤 혜택</TitleBlue>을 추천해드립니다.
      </Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
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
