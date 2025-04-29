import dayjs from 'dayjs';

/** 카드정보 데이터 타입 */
export type Card = {
  CardId: number;
  createdAt: string;
  cardNumber: string;
  memberName: string;
  expired: string;
  securityCode: string;
};

/** (서버 통신 시) 카드정보 매핑 타입 */
export type CardItem = {
  label: string; // ex. 발급일자
  value: string | number; //  ex. Card.cardNumber
};

// 카드 번호에 - 를 추가하는 함수
const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
};

export const mapCardToItemList = (data: Card): CardItem[] => [
  { label: '발급일자', value: dayjs(data.createdAt).format('YYYY.MM.DD') },
  { label: '카드번호', value: formatCardNumber(data.cardNumber) },
  { label: '발급인', value: data.memberName },
  { label: '만료일', value: dayjs(data.expired).format('MM/YY') },
  { label: 'CVC', value: data.securityCode },
];
