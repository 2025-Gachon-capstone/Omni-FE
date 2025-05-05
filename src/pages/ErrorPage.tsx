import styled from '@emotion/styled';
import { Button } from '../shared/ui';
import { useNavigate } from 'react-router-dom';
import theme from '../shared/styles/theme';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content color={theme.color.main} size="5rem" weight="600">
        404
      </Content>
      <Content color={theme.color.main} size="1.5rem" weight="500">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </Content>
      <Content size="1.2rem">
        존재하지않는 주소를 입력하였거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 <br />
        찾을 수 없습니다.
      </Content>
      <Margin />
      <Button onClick={() => navigate('/')}>홈으로</Button>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15vh auto 0 auto;
  gap: 1rem;
`;

const Content = styled.div<{ color?: string; size?: string; weight?: string }>`
  color: ${(props) => props.color || 'black'};
  font-size: ${(props) => props.size || '1rem'};
  font-weight: ${(props) => props.weight || '300'};
  text-align: center;
`;

const Margin = styled.div`
  margin-bottom: 3rem;
`;
