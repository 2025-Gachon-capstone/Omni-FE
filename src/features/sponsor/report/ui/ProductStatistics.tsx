import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import { RiCalculatorFill } from 'react-icons/ri';
import { StatisticsTabs } from './StatisticsTabs';
import { StatisticsData } from '../type/StatisticsType';
import { TabChart } from '../model/StatisticsTabList';
import { ChartRenderer } from './ChartRenderer';

export const ProductStatistics = ({ data }: { data: StatisticsData }) => {
  const [selectedTab, setSelectedTab] = useState<keyof typeof TabChart>('reordered'); // 선택된 통계메뉴

  return (
    <Wrapper>
      {/** 제목 */}
      <Header>
        <Title>
          <RiCalculatorFill color={theme.color.main} size={30} />
          최근 판매 100건 통계
        </Title>
        <DateHint>
          시작일: {data.period.min || '정보없음'}
          <br />
          종료일: {data.period.max || '정보없음'}
        </DateHint>
      </Header>
      {/** 판매통계 메뉴 */}
      <StatisticsTabs selectedKey={selectedTab} onSelect={setSelectedTab} />
      {/** 각 메뉴의 판매 통계 그래프 */}
      <ChartRenderer selectedTab={selectedTab} data={data[selectedTab]} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin: 1.5rem 0;
  padding: 1rem 3rem;
  min-height: 32rem;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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

const DateHint = styled.div`
  color: #939393;
  font-size: 11px;
`;
