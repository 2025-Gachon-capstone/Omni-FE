import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { useNavigate } from 'react-router-dom';

export const JoinPhrase = () => {
  const navigate = useNavigate();
  return (
    <JoinBox>
      <Text color="#1D1D1F">계정이 없으신가요?</Text>
      <Text
        color={`${theme.color.main}`}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/join')}
      >
        회원가입
      </Text>
    </JoinBox>
  );
};

const JoinBox = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 0 auto;
`;

const Text = styled.div<{ color: string }>`
  font-weight: 300;
  color: ${(props) => props.color};
`;
