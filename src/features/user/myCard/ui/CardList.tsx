import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import IMG from '../../../../shared/assets/img/card.svg';
import { FaAngleRight } from 'react-icons/fa6';
import useDevice from '../../../../shared/hooks/useDevice';
import { CardPreview, formatCardNumber } from '../type/Card';
import useIntersectionObserver from '../../../../shared/hooks/useIntersectionObserver';
import dayjs from 'dayjs';
import { DotLoader } from '../../../../shared/ui';
import { useCardInfo } from '../api/useCardInfo';

export const CardList = ({
  selectedId,
  handleSelectCard,
}: {
  selectedId: number | null;
  handleSelectCard: (cardId: number) => void;
}) => {
  const { loading, getCardList } = useCardInfo();
  const { isMobile } = useDevice();

  const listRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);

  const [cardData, setCardData] = useState<CardPreview[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  // observer callback
  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting) {
      if (!isEnd) {
        const next = pageRef.current + 1;
        const result = await getCardList(next);
        if (result.last) {
          setIsEnd(true);
        }
        setCardData((prevData) => [...prevData, ...(result.data || [])]);
        pageRef.current = next;
      }

      observer.unobserve(entry.target);
    }
  };

  // 옵저버 객체
  const { setTarget, setRoot } = useIntersectionObserver({
    rootMargin: '50px',
    threshold: 0.5,
    onIntersect,
  });

  // 옵저버 컨테이너 설정
  useEffect(() => {
    if (listRef.current) {
      setRoot(listRef.current);
    }
  }, [listRef.current]);

  // 초기 데이터 설정
  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await getCardList(0);
      setCardData(result.data || []);
      if (result.last) {
        setIsEnd(true);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <Container ref={listRef}>
      {cardData.map((data, index) => {
        const isLastCard = index === cardData.length - 1;
        return (
          <CardBox
            key={data.cardId}
            isMobile={isMobile}
            selected={data.cardId === selectedId}
            onClick={() => handleSelectCard(data.cardId)}
            ref={isLastCard && !isEnd ? setTarget : null}
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
      {loading && <DotLoader />}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  flex-grow: 1;
  flex-basis: 20rem;
  flex-shrink: 0;
  height: 28rem;
  padding: 2rem 0.8rem 2rem 1rem;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const CardBox = styled.div<{ isMobile: boolean; selected: boolean }>`
  width: 90%;
  box-sizing: border-box;

  padding: 1rem 1.5rem;
  justify-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.selected ? '#e4e4e4' : 'inherit')};
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
