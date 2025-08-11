import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { TimeData } from '../type/StatisticsType';
import theme from '../../../../shared/styles/theme';

export const ChartTime = ({ type, data }: { type: string; data: TimeData[] }) => {
  const state: ApexOptions = {
    series: [
      {
        name: '판매 건수',
        data: data.map((el) => el.count),
      },
    ],
  };

  const xaxisTitle = type === 'orderHour' ? '시간(단위:시)' : '요일(단위:일)';
  const categories =
    type === 'orderHour'
      ? data.map((el) => `${el.label}시`)
      : data.map((el) => {
          const days = ['일', '월', '화', '수', '목', '금', '토'];
          return days[Number(el.label)];
        });

  const options: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      background: 'transperant',
      foreColor: '#333333',
    },
    colors: [`${theme.color.main}`],
    xaxis: {
      title: {
        text: xaxisTitle,
      },
      categories: categories,
    },
    yaxis: {
      title: {
        text: '판매 건수 (단위: 개)',
      },
    },
    dataLabels: { enabled: false },
  };
  return <ReactApexChart options={options} series={state.series} type="line" width={'100%'} />;
};
