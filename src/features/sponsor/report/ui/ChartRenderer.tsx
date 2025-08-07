import { TabChart } from '../model/StatisticsTabList';
import { ReorderData, TimeData, RelatedProductData } from '../type/StatisticsType';
import styled from '@emotion/styled';
import { ChartReordered } from './ChartReordered';
import { ChartTime } from './ChartTime';
import { ChartWord } from './ChartWord';

type Props = {
  selectedTab: keyof typeof TabChart;
  data: ReorderData[] | TimeData[] | RelatedProductData[];
};

export const ChartRenderer = ({ selectedTab, data }: Props) => {
  let chartComponent;

  switch (selectedTab) {
    case 'reordered':
      chartComponent = <ChartReordered data={data as ReorderData[]} />;
      break;
    case 'orderHour':
    case 'orderDow':
      chartComponent = <ChartTime type={selectedTab} data={data as TimeData[]} />;
      break;
    case 'relatedProduct':
      chartComponent = <ChartWord data={data as RelatedProductData[]} />;
      break;
    default:
      chartComponent = null;
  }

  return <Wrapper>{chartComponent}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
`;
