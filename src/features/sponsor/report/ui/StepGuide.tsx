import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';

export const StepGuide = () => {
  const [params] = useSearchParams();
  const step = params.get('step') || '1';

  return (
    <StepWrapper>
      <Circle mine={1} step={Number(step)}>
        1
      </Circle>
      <Bar mine={1} step={Number(step)} />
      <Circle mine={2} step={Number(step)}>
        2
      </Circle>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Bar = styled.div<{ mine: number; step: number }>`
  width: 36px;
  height: 3px;
  background: ${({ mine, step }) => (mine < step ? `${theme.color.main}` : '#F2F2F2')};
`;

const Circle = styled.div<{ mine: number; step: number }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ mine, step }) => (mine <= step ? `${theme.color.main}` : '#F2F2F2')};
  color: white;
`;
