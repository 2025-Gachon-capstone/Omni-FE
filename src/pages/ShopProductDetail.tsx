import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '../features/shop/detail/ui/ProductInfo';
import { ProductItemDetail } from '../features/shop/detail/type/Product';
import useDevice from '../shared/hooks/useDevice';

const ShopProductDetail = () => {
  const { isMobile } = useDevice();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItemDetail | null>(null);

  useEffect(() => {
    // (임시) 상품 id로 데이터 불러오기
    if (productId) {
      setProduct({
        productId: Number(productId),
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      });
    }
  }, [productId]);

  return (
    <Container isMobile={isMobile}>
      {/** 상품이미지 */}
      <ImgContainer>
        <Img src={product?.image1} />
      </ImgContainer>
      {/** 상품 정보 */}
      {product && <ProductInfo product={product} />}
    </Container>
  );
};

export default ShopProductDetail;

const Container = styled.div<{ isMobile: boolean }>`
  max-width: 100vw;
  margin-top: 5rem;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: center;
  align-items: flex-start;
  gap: 6.5rem;
`;

const ImgContainer = styled.div`
  width: 90%;
  max-width: 26rem;
  max-height: 30rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
