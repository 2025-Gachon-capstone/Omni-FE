import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import { useCartStore } from '../../../../shared/store';

interface CartListProps {
  productList: CartItem[];
  type: string;
}

export const CartList = ({ productList, type }: CartListProps) => {
  const deleteItem = useCartStore((state) => state.removeItem);

  // 상품 삭제하기
  const handleDelete = (id: number) => {
    deleteItem(id); // id가 일치하는 아이템 삭제
  };

  return (
    <Container>
      <Title>상품리스트</Title>
      <TableContainer>
        <div className="table-header">
          <TD width="40%" center>
            상품정보
          </TD>
          <TD width="20%" center>
            가격
          </TD>
          <TD width="20%" center>
            수량
          </TD>
          <TD width="20%" center>
            총 금액
          </TD>
        </div>
        <div className="table-body">
          {productList?.map((el) => (
            <Row key={el.productId}>
              <div className="table-body-row">
                <TD width="40%">
                  <Img>
                    <img src={el?.imageUrl} alt="상품 이미지" />
                  </Img>
                  <span className="text">{el?.productName}</span>
                </TD>
                <TD width="20%" center>
                  ₩ {el?.productPrice.toLocaleString()}
                </TD>
                <TD width="20%" center>
                  {el.count}
                </TD>
                <TD width="20%" center>
                  ₩ {(el.count * Number(el?.productPrice)).toLocaleString()}
                </TD>
              </div>
              {type === 'cart' && (
                <DeleteBtn onClick={() => handleDelete(el.productId)}>삭제</DeleteBtn>
              )}
            </Row>
          ))}
        </div>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  .table-header {
    width: 100%;
    min-width: 72rem;
    padding: 0 0.75rem;
    display: flex;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    box-sizing: border-box;
  }

  .table-body {
    width: 100%;
    min-width: 72rem;
    display: flex;
    flex-direction: column;
  }
`;

const TD = styled.div<{ width: string; center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  max-width: ${({ width }) => width};
  padding: 1rem 0.5rem;
  box-sizing: border-box;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: ${({ center }) => (center ? 'center' : 'start')};
  gap: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  gap: 0;
  border-bottom: 1px solid #dbdbdb;

  .table-body-row {
    display: flex;
  }
`;

const Img = styled.div`
  width: 10rem;
  height: 10rem;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteBtn = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${theme.color.main};
  cursor: pointer;
`;
