import styled from '@emotion/styled';
import { InfoInput } from './InfoInput';
import { Card, mapCardToItemList } from '../type/Card';

export const MyCardInfo = () => {
  // 임시데이터
  const cardData: Card = {
    CardId: 0,
    createdAt: '2024.01.01',
    cardNumber: '1234-5678-9012-3456',
    memberName: '홍길동',
    expiredDate: '01/26',
    securityCode: '123',
    cardPassword: '1111',
  };
  const cardItemList = mapCardToItemList(cardData); // 서버데이터 & value라벨 매핑

  return (
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
