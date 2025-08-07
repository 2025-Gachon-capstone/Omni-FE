import WordCloud from 'react-d3-cloud';
import { RelatedProductData } from '../type/StatisticsType';
import { useCallback } from 'react';

type Word = {
  text: string;
  value: number;
};

export const ChartWord = ({ data }: { data: RelatedProductData[] }) => {
  const words: Word[] = data.map((word) => ({
    text: word.label,
    value: word.count,
  }));

  const fontSize = useCallback((word: Word) => word.value * 1.3, []);

  const handleMouseOver = (event: any, d: any) => {
    const target = event.target;
    if (target) {
      target.style.cursor = 'pointer';
      target.style.fontSize = `${d.value * 1.4}px`;
    }
  };

  const handleMouseOut = (event: any, d: any) => {
    const target = event.target;
    if (target) {
      target.style.cursor = 'default';
      target.style.fontSize = `${d.value * 1.3}px`;
    }
  };

  return (
    <WordCloud
      width={600}
      height={400}
      padding={10}
      fontStyle="Pretendard"
      fontWeight="bold"
      fontSize={fontSize}
      onWordMouseOver={handleMouseOver}
      onWordMouseOut={handleMouseOut}
      data={words}
    />
  );
};
