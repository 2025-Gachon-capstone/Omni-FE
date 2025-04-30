import { useState, useEffect } from 'react';
import { useCardInfo } from '../api/useCardInfo';
import styled from '@emotion/styled';
import { InfoInput } from './InfoInput';
import { Card, mapCardToItemList } from '../type/Card';
import Loading from '../../../../pages/Loading';

export const MyCardInfo = () => {
  const { loading, getCardInfo } = useCardInfo();
  const [cardData, setCardData] = useState<Card | null>(null);

  // 카드 정보 가져오기 API
  useEffect(() => {
    const fetchCardInfo = async () => {
      const { isSuccess, data } = await getCardInfo();
      if (isSuccess) {
        setCardData(data);
      }
    };
    fetchCardInfo();
  }, []);

  if (!cardData) {
    return <Container>카드 정보가 없습니다.</Container>;
  }

  const cardItemList = mapCardToItemList(cardData); // 서버 데이터 매핑

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {cardItemList.map((card, i) => (
        <InfoInput key={i} label={card.label} value={card.value} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 37rem;
  gap: 1rem;
`;
