import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import { Benefit } from '../type/Benefit';
import dayjs from 'dayjs';
import useDevice from '../../../../shared/hooks/useDevice';

export const AvailableList = ({ data }: { data: Benefit[] }) => {
  const { isMobile } = useDevice();
  return (
    <Container>
      <TitleWrap isMobile={isMobile}>
        <div className="title">현재 가용 혜택</div>
        <div className="date">
          혜택 업데이트 일자 :{' '}
          {data.length > 0 ? dayjs(data[0].updatedAt).format('YYYY-MM-DD') : '정보 없음'}
        </div>
      </TitleWrap>
      <Content>
        {data.map((el) => {
          return <BenefitItem key={el.cardBenefitId}>{el.title}</BenefitItem>;
        })}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 20rem;
  max-height: 36rem;
  border: 1px solid ${theme.color.main};
  border-radius: 8px;
  overflow: hidden;
`;

const TitleWrap = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'flex-start' : 'flex-end')};
  justify-content: space-between;
  gap: 0.25rem;

  width: 100%;
  min-height: 3.5rem;

  padding: 1rem 1.75rem;
  box-sizing: border-box;
  background-color: ${theme.color.main};
  color: white;

  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .date {
    font-size: 0.75rem;
    font-weight: 300;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  max-height: 25rem;
  padding: 1.5rem 2.25rem;
  overflow-y: auto;
  box-sizing: border-box;

  font-size: 1.25rem;
  font-weight: 500;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.color.main};
    border-radius: 0.5rem;
  }
`;

const BenefitItem = styled.div`
  width: 100%;
  overflow-wrap: break-word;
`;
