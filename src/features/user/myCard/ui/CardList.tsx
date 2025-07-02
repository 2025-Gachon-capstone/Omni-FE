import styled from '@emotion/styled';
import IMG from '../../../../shared/assets/img/card.svg';
import { FaAngleRight } from 'react-icons/fa6';
import useDevice from '../../../../shared/hooks/useDevice';
import { CardPreview, formatCardNumber } from '../type/Card';
import dayjs from 'dayjs';

const DATA: CardPreview[] = [
  {
    cardId: 222,
    cardNumber: '4198801181868521',
    createdAt: '2025-05-03T18:20:14',
  },
  {
    cardId: 223,
    cardNumber: '4198801181868521',
    createdAt: '2025-05-03T18:20:14',
  },
  {
    cardId: 224,
    cardNumber: '4198801181868521',
    createdAt: '2025-05-03T18:20:14',
  },
  {
    cardId: 225,
    cardNumber: '4198801181868521',
    createdAt: '2025-05-03T18:20:14',
  },
  {
    cardId: 226,
    cardNumber: '4198801181868521',
    createdAt: '2025-05-03T18:20:14',
  },
];

export const CardList = ({ handleSelectCard }: { handleSelectCard: (cardId: number) => void }) => {
  const { isMobile } = useDevice();

  return (
    <Container>
      {DATA.map((data) => {
        return (
          <CardBox
            key={data.cardId}
            isMobile={isMobile}
            onClick={() => handleSelectCard(data.cardId)}
          >
            <div className="card-content">
              <img className="img" src={IMG} alt="카드이미지" />
              <div className="description">
                <div className="cardNumber">{formatCardNumber(data.cardNumber)}</div>
                <div className="cardDate">
                  발급일자 &nbsp;&nbsp;&nbsp;{dayjs(data.createdAt).format('YYYY.MM.DD')}
                </div>
              </div>
            </div>
            <FaAngleRight size={20} color="#B8B8B8" />
          </CardBox>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  flex-grow: 1;
  height: 28rem;
  padding: 2rem 1rem 2rem 2rem;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const CardBox = styled.div<{ isMobile: boolean }>`
  width: 90%;
  padding: 1rem 0;
  justify-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  .card-content {
    display: flex;
    justify-self: flex-end;
    flex-basis: 20rem;
    flex-shrink: 1;
    min-width: 0;
    gap: 2rem;

    .img {
      transform: rotate(-90deg);
      width: auto;
      height: ${(props) => (props.isMobile ? '3rem' : '4.5rem')};
      border-radius: 0.25rem;
      object-fit: contain;
      flex-shrink: 0;
    }
    .description {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
      .cardNumber {
        font-size: 1.25rem;
        font-weight: 500;
        color: #1d1d1f;
      }
      .cardDate {
        font-size: 0.75rem;
        font-weight: 300;
        color: #595959;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;
