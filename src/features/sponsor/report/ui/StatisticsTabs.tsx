import styled from '@emotion/styled';
import { StatisticsTabList, TabChart } from '../model/StatisticsTabList';
import theme from './../../../../shared/styles/theme';

type TabProps = {
  selectedKey: string;
  onSelect: (key: keyof typeof TabChart) => void;
};

export const StatisticsTabs = ({ selectedKey, onSelect }: TabProps) => {
  return (
    <TabWrapper>
      {StatisticsTabList.map((tab) => (
        <Tab
          key={tab.key}
          isSelect={selectedKey == tab.key}
          onClick={() => onSelect(tab.key as keyof typeof TabChart)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
`;

const Tab = styled.div<{ isSelect: boolean }>`
  cursor: pointer;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  background-color: ${({ isSelect }) =>
    isSelect ? `${theme.color.main}` : `${theme.color.main_gray}`};
  color: ${({ isSelect }) => (isSelect ? 'white' : `black`)};
  transition: all 0.1s;
  &:hover {
    opacity: 0.8;
  }
`;
