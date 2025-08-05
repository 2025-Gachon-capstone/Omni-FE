import styled from '@emotion/styled';
import { FaPen } from 'react-icons/fa';
import theme from '../../../../shared/styles/theme';

export const ProductAI = ({ report }: { report: string }) => {
  return (
    <Wrapper>
      <Header>
        <FaPen size={24} color={theme.color.main} />
        <Title>AI 리포트</Title>
      </Header>
      <Content>{report}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin: 1.5rem 0;
  padding: 1rem 3rem;
  height: 25rem;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  width: 100%;
  padding: 1.2rem 0;
  margin-bottom: 1.3rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    display: block;
    background-color: #dbdbdb;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 0.5rem;
  max-height: 17rem;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 0.5rem;
  }
`;
