/** 카드정보 데이터 타입 */
export type Card = {
  CardId: number;
  createdAt: string;
  cardNumber: string;
  memberName: string;
  expiredDate: string;
  securityCode: string;
  cardPassword: string;
};

/** (서버 통신 시) 카드정보 매핑 타입 */
export type CardItem = {
  label: string; // ex. 발급일자
  value: string | number; //  ex. Card.cardNumber
};

export const mapCardToItemList = (data: Card): CardItem[] => [
  { label: '발급일자', value: data.createdAt },
  { label: '카드번호', value: data.cardNumber },
  { label: '발급인', value: data.memberName },
  { label: '만료일', value: data.expiredDate },
  { label: 'CVC', value: data.securityCode },
  { label: '비밀번호', value: data.cardPassword },
];
