import styled from '@emotion/styled';
import { ProductItem } from '../type/Product';
import theme from '../../../../shared/styles/theme';
import useDevice from '../../../../shared/hooks/useDevice';
import { useNavigate } from 'react-router-dom';

export const ProductItems = ({ products }: { products: ProductItem[] }) => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  return (
    <ProductGrid>
      {products.map((item) => (
        <ProductCard key={item.productId} onClick={() => navigate(`/shop/${item.productId}`)}>
          <ImgCard isMobile={isMobile}>
            <ProductTag>{item.companyName}</ProductTag>
            <ProductImage src={item.image1} alt={item.productName} />
          </ImgCard>
          <ProductName>{item.productName}</ProductName>
          <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};

const ProductGrid = styled.div`
  max-width: 75rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2.5rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgCard = styled.div<{ isMobile: boolean }>`
  max-width: 15rem;
  max-height: 15rem;
  position: relative;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  overflow: hidden;
`;

const ProductTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${theme.color.main_blue};
  color: ${theme.color.main};
  font-weight: 600;
  font-size: 0.75rem;
  width: 3rem;
  padding: 0.5rem;
  border-radius: 8px;
  display: inline-block;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #333333;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #0040a6;
`;
