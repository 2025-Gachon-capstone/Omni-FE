import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '../features/shop/detail/ui/ProductInfo';
import useDevice from '../shared/hooks/useDevice';
import { useGetProductDetail } from '../features/shop/detail/api/useGetProductDetail';
import Loading from './Loading';

const ShopProductDetail = () => {
  const { isMobile } = useDevice();
  const { productId } = useParams<{ productId: string }>();

  const { loading, data } = useGetProductDetail(Number(productId) || null);

  return loading ? (
    <Loading />
  ) : (
    <Container isMobile={isMobile}>
      {/** 상품이미지 */}
      <ImgContainer>
        <Img src={data?.imageUrl} />
      </ImgContainer>
      {/** 상품 정보 */}
      {data && <ProductInfo product={data} />}
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
