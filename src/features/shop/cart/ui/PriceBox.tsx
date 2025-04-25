import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';

export const PriceBox = ({
  initial,
  discount,
  total,
}: {
  initial: number;
  discount: number;
  total: number;
}) => {
  return (
    <Container>
      <PriceColumn>
        <div className="price">상품금액</div>
        <div className="price">₩ {initial.toLocaleString()}</div>
      </PriceColumn>
      {/** 혜택 적용된 경우.. */}
      <PriceColumn>
        <div className="price">할인금액</div>
        <div className="price ">₩ {discount.toLocaleString()}</div>
      </PriceColumn>
      <PriceColumn>
        <div className="total-price">총계</div>
        <div className="total-price total-price-number">₩ {total.toLocaleString()}</div>
      </PriceColumn>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5rem;
  width: 90%;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PriceColumn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;

  .price {
    font-size: 1.5rem;
  }
  .total-price {
    font-size: 1.75rem;
    &.total-price-number {
      color: ${theme.color.main};
    }
  }
`;
