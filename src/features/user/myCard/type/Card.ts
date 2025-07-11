import dayjs from 'dayjs';

/** 카드정보 미리보기 타입 */
export type CardPreview = {
  cardId: number;
  cardNumber: string;
  createdAt: string;
};

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

// 카드 번호에 - 를 추가하는 함수 (* 마스킹)
export const formatCardNumber = (cardNumber: string): string => {
  const formattedNumber = cardNumber
    .replace(/(\d{4})(?=\d)/g, '$1-')
    .replace(/(?<=\d{4}\-)(\d{4}\-\d{4})(?=\-\d{4})/, '****-****');
  return formattedNumber;
};

export const mapCardToItemList = (data: Card): CardItem[] => [
  { label: '발급일자', value: dayjs(data.createdAt).format('YYYY.MM.DD') },
  { label: '카드번호', value: data.cardNumber.replace(/(\d{4})(?=\d)/g, '$1-') },
  { label: '발급인명', value: data.memberName },
  { label: '만료일자', value: dayjs(data.expired).format('MM/YY') },
  { label: '보안코드', value: data.securityCode },
];
