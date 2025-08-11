import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
import useDevice from './../../../../shared/hooks/useDevice';
import WordCloud from 'react-d3-cloud';
import { memo, useCallback, useState } from 'react';
import { RelatedProductData } from '../type/StatisticsType';
import { useCustomBenefit } from '../model/useCustomBenefit';

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
    productId: 4,
    label: '딸기',
    count: 30,
  },
  {
    productId: 5,
    label: '수박',
    count: 10,
  },
];

type Word = {
  text: string;
  value: number;
};

const MemoizedWordCloud = memo(WordCloud); // 리렌더링 방지를 위한 WordCloud 컴포넌트 메모이징.

export const CustomWordSection = () => {
  const { isMobile } = useDevice();
  const { customState, addExcludeProduct, subExcludeProduct } = useCustomBenefit((state) => state);
  const [exclude, setExclude] = useState<RelatedProductData[]>(customState.excludeProductIdList); // 제외할 제품 리스트
  const [words] = useState<Word[]>(() =>
    DATA.map((word) => ({
      text: word.label,
      value: word.count,
    })),
  );

  /** ----- wordcloud 레이아웃 메서드 ------ */
  const fontSize = useCallback((word: Word) => word.value * 1.3, []);
  const handleMouseOver = useCallback((event: any, d: any) => {
    const target = event.target;
    if (target) {
      target.style.cursor = 'pointer';
      target.style.fontSize = `${d.value * 1.4}px`;
    }
  }, []);
  const handleMouseOut = useCallback((event: any, d: any) => {
    const target = event.target;
    if (target) {
      target.style.cursor = 'default';
      target.style.fontSize = `${d.value * 1.3}px`;
    }
  }, []);

  /** --------- 태그 추가, 삭제 메서드 ---------- */
  const addProductTag = (tag: RelatedProductData) => {
    if (!customState.excludeProductIdList.some((p) => p.productId === tag.productId)) {
      addExcludeProduct(tag);
      setExclude((prev) => [...prev, tag]);
    }
  };
  const subProductTag = (tag: RelatedProductData) => {
    const newArr = exclude.filter((product) => product.productId !== tag.productId);
    subExcludeProduct(tag);
    setExclude(newArr);
  };

  // wordcloud 클릭 이벤트 함수
  const handleWordClick = useCallback((_: React.MouseEvent<SVGTextElement>, word: Word) => {
    const product = DATA.find((product) => product.label === word.text);
    if (product) {
      addProductTag(product);
    }
  }, []);

  return (
    <Wrapper isMobile={isMobile}>
      <MemoizedWordCloud
        padding={10}
        fontStyle="Pretendard"
        fontWeight="bold"
        data={words}
        fontSize={fontSize}
        onWordMouseOver={handleMouseOver}
        onWordMouseOut={handleMouseOut}
        onWordClick={handleWordClick}
      />
      {/** 제외 제품 리스트 */}
      <LeftBox>
        <Title>제외된 제품</Title>
        <Bar />
        {/** 제외 제품 태그 */}
        <ExcludeList>
          {exclude.map((tag) => (
            <Tag key={tag.productId} onClick={() => subProductTag(tag)}>
              {tag.label}
              <IoIosClose size={20} />
            </Tag>
          ))}
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
  ${({ isMobile }) =>
    isMobile ? `grid-template-rows: 1fr 1fr;` : `grid-template-columns: 1fr 1fr;`}
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
  gap: 8px;
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
