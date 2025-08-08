import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
import useDevice from './../../../../shared/hooks/useDevice';
import WordCloud from 'react-d3-cloud';
import { useCallback } from 'react';

const DATA = [
  // 20개 제공
  {
    productId: 0,
    label: '상품1',
    count: 10,
  },
  {
    productId: 1,
    label: 'Smart Ones',
    count: 5,
  },
  {
    productId: 2,
    label: '상품11',
    count: 15,
  },
  {
    productId: 3,
    label: '바나나',
    count: 30,
  },
  {
    productId: 3,
    label: '딸기',
    count: 30,
  },
  {
    productId: 3,
    label: '수박',
    count: 10,
  },
];

type Word = {
  text: string;
  value: number;
};

export const CustomWordSection = () => {
  const { isMobile } = useDevice();

  const words: Word[] = DATA.map((word) => ({
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
    <Wrapper isMobile={isMobile}>
      <WordCloud
        padding={10}
        fontStyle="Pretendard"
        fontWeight="bold"
        fontSize={fontSize}
        onWordMouseOver={handleMouseOver}
        onWordMouseOut={handleMouseOut}
        data={words}
      />
      {/** 제외 제품 리스트 */}
      <LeftBox>
        <Title>제외된 제품</Title>
        <Bar />
        {/** 제외 제품 태그 */}
        <ExcludeList>
          <Tag>
            하이
            <IoIosClose size={20} />
          </Tag>
        </ExcludeList>
      </LeftBox>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isMobile: boolean }>`
  min-height: 20rem;
  padding: 1rem 5rem 2rem 5rem;
  box-sizing: border-box;
  border-radius: 8px;
  background: white;
  box-shadow:
    4px 4px 12px 0 rgba(213, 212, 212, 0.2),
    -4px -4px 12px 0 rgba(213, 212, 212, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LeftBox = styled.div`
  padding: 3rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const Bar = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dbdbdb;
`;

const ExcludeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: #e8f3ff;
  min-width: 4rem;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;
