import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import useDevice from '../../../shared/hooks/useDevice';
import CardImg from '../../../shared/assets/img/landingImg.svg';
import { ChatEmoji } from './ChatEmoji';

export const ThirdSection = () => {
  const { isMobile } = useDevice();

  return (
    <Container isMobile={isMobile}>
      <LeftContent isMobile={isMobile}>
        <ChatEmoji />
        <div style={{ fontSize: '1.5rem', fontWeight: '600', color: `${theme.color.main}` }}>
          카드 하나로
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          숨겨진 나만의 혜택을 <br />
          누려보세요!
        </div>
      </LeftContent>
      <RightContent>
        <img src={CardImg} alt="카드미리보기" width={`100%`} />
      </RightContent>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  gap: 8rem;
  padding: 12% 5% 15% 5%;
  font-weight: 600;
  box-sizing: border-box;
`;
const LeftContent = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  ${(props) => props.isMobile && `margin-right:auto`};
`;
const RightContent = styled.div`
  max-width: 39rem;
`;
