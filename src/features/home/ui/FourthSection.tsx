import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { StepSection } from './StepSection';
import { data } from '../model/StepData';
import { Fade } from 'react-awesome-reveal';

export const FourthSection = () => {
  return (
    <Container>
      <TitleBox>
        <Circle />
        <div className="sub-title">Service step</div>
        <div className="main-title">서비스 이용방법</div>
      </TitleBox>
      {/** 카드섹션 */}
      <SectionWrapper>
        <Fade cascade damping={0.3}>
          {data.map((el) => {
            return (
              <StepSection
                key={el.step}
                step={el.step}
                title={el.title}
                description={el.description}
              />
            );
          })}
        </Fade>
      </SectionWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.75rem;
  padding: 12% 5% 15% 5%;
  box-sizing: border-box;
`;

/** 제목 */
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .main-title {
    font-size: 2rem;
    font-weight: 800;
  }
  .sub-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.color.main};
  }
`;
const Circle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${theme.color.main};
`;

/** 본문 - 카드섹션 */
const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
