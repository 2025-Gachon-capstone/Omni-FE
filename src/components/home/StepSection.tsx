import styled from '@emotion/styled';
import theme from '../../styles/theme';

type StepInfo = {
  step: number; // 단계
  title: string; // step별 제목
  description: string; // step별 설명
};

export const StepSection = ({ step, title, description }: StepInfo) => {
  return (
    <Card>
      <CardNum>0{step}</CardNum>
      <CardContents>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContents>
    </Card>
  );
};

const Card = styled.div`
  height: 18rem;
  max-width: 19rem;
  padding: 0.5rem 1rem 3.8rem 1rem;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
`;

const CardNum = styled.div`
  color: #d9d9d9;
  font-weight: 800;
  font-size: 3rem;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem auto;
  padding: 0 2rem;
`;

const CardTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.color.main};
`;

const CardDescription = styled.div`
  font-size: 1.25rem;
  color: #505050;
`;
