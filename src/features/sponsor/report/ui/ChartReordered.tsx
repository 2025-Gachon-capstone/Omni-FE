import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { ReorderData } from '../type/StatisticsType';
import theme from '../../../../shared/styles/theme';

export const ChartReordered = ({ data }: { data: ReorderData[] }) => {
  const state: ApexOptions = {
    series: [
      {
        name: '재구매',
        data: data.map((el) => el.count),
      },
    ],
  };

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      zoom: {
        enabled: false,
      },
      background: 'transperant',
      foreColor: '#333333',
    },
    colors: [`${theme.color.main}`],
    xaxis: {
      title: {
        text: '재구매(단위: T/F)',
      },
      categories: ['첫 구매', '재구매'],
    },
    yaxis: {
      title: {
        text: '판매 건수 (단위: 개)',
      },
    },
    dataLabels: { enabled: false },
  };
  return <ReactApexChart options={options} series={state.series} type="bar" width={'100%'} />;
};
