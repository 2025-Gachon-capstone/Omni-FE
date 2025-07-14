import { useState } from 'react';
import styled from '@emotion/styled';
import { InfoInput } from './InfoInput';
import { Card, mapCardToItemList } from '../type/Card';
import useDevice from '../../../../shared/hooks/useDevice';

export const MyCardInfo = ({ cardInfo }: { cardInfo: Card }) => {
  const { isMobile } = useDevice();
  const [cardData] = useState<Card | null>(cardInfo);

  const cardItemList = cardData ? mapCardToItemList(cardData) : [];
  return (
    <Form isMobile={isMobile}>
      <div className="title">카드 상세정보</div>
      <SeparateBar />
      {cardItemList.map((card, i) => (
        <InfoInput key={i} label={card.label} value={card.value} />
      ))}
    </Form>
  );
};

const Form = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1d1d1f;
  }
`;

const SeparateBar = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background-color: #f0f0f0;
`;
