import styled from '@emotion/styled';

export const ProductCount = ({
  count,
  price,
  decrease,
  increase,
}: {
  count: number;
  price: number;
  decrease: () => void;
  increase: () => void;
}) => {
  return (
    <Container>
      <P>수량</P>
      <div className="count-container">
        <div className="btn-container">
          <CountBtn onClick={decrease}>-</CountBtn>
          <P>{count}</P>
          <CountBtn onClick={increase}>+</CountBtn>
        </div>
        <P>₩&nbsp;{price.toLocaleString()}</P>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;

  padding: 1.5rem;
  gap: 1rem;

  .count-container {
    display: flex;
    justify-content: space-between;
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 8rem;
  }
`;

const CountBtn = styled.div`
  background-color: inherit;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  border: 1px solid #1d1d1f;
  cursor: pointer;
`;

const P = styled.div`
  font-size: 1.5rem;
`;
