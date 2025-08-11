import styled from '@emotion/styled';
import { BsPlusSquareFill } from 'react-icons/bs';
import theme from '../../../../shared/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useCustomBenefit } from '../model/useCustomBenefit';

type Product = {
  productId: number;
  productName: string;
};

type ProductListDTO = {
  selectedId: number | null;
  products: Product[];
};

export const ProductList = ({ selectedId, products }: ProductListDTO) => {
  const navigate = useNavigate();
  const { clearState } = useCustomBenefit((state) => state);

  const handleSelectedProduct = (product: Product) => {
    const newParams = new URLSearchParams();
    newParams.set('productId', product.productId.toString());
    newParams.set('name', product.productName.toString());
    newParams.set('step', '1');
    navigate(`/sponsor/report?${newParams.toString()}`, { replace: true });
    clearState();
  };

  return (
    <Sidebar>
      {/** 제품 목록 헤더 */}
      <Header>
        <Title>제품 목록</Title>
        <AddButton>
          <BsPlusSquareFill size={32} color={theme.color.main} />
        </AddButton>
      </Header>

      {/** (스크롤) 제품 목록 */}
      <List>
        {products.map((product) => (
          <ListItem
            selected={product.productId == selectedId}
            onClick={() => handleSelectedProduct(product)}
          >
            {product.productName}
          </ListItem>
        ))}
      </List>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 250px;
  height: 100vh;
  padding: 5rem 1.2rem 2rem 1.2rem;
  background-color: ${theme.color.main_blue};

  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AddButton = styled.button`
  all: unset;
  cursor: pointer;
  transition: all 0.1s;
  svg {
    background-color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.div`
  margin-left: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const List = styled.ul`
  all: unset;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  padding-right: 0.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #bec7d9; /* 스크롤바 막대 색상 */
    border-radius: 0.5rem;
  }
`;

const ListItem = styled.li<{ selected: boolean }>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-size: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  background-color: ${({ selected }) => (selected ? `${theme.color.main_gray}` : 'transparent')};
  transition: all 0.1s;
  cursor: pointer;

  ${({ selected }) =>
    !selected &&
    `
      &:hover {
        background-color: #c5cede;
      }  
  `}
`;
