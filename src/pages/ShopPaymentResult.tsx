import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { Button } from '../shared/ui';
import theme from '../shared/styles/theme';
import { useCartStore, usePendingStore } from './../shared/store';

const ShopPaymentResult = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const { reset } = usePendingStore();
  const { clearCart } = useCartStore();

  // [장바구니 결제]인지 판단하는 함수
  const isCartPayment = () => {
    const cartItems = useCartStore.getState().items;
    const pendingItems = usePendingStore.getState().items;

    if (pendingItems.length === 0) return false;

    // pending에 있는 모든 아이템이 cart에 포함되어 있으면 장바구니 결제
    return pendingItems.every((pendingItem) =>
      cartItems.some((cartItem) => cartItem.productId === pendingItem.productId),
    );
  };

  useEffect(() => {
    const checkPayment = async () => {
      if (type === 'success') {
        try {
          // Toss 쿼리 (ex. shop/pay/success?paymentType=NORMAL&orderId=MC45MTE4OTE3NTMyMTUy&paymentKey=tgen_20250423194458pNsc4&amount=3600)
          // 1. 쿼리 값 추출
          // {
          //   "cardNumber":"string",
          //   "orderCode":"string",
          //   "paymentKey":"string",
          //   "total_price":1000
          // }
          // 2. 결제 인증 API 호출
          // 3. 스토리지 정리
          if (isCartPayment()) {
            clearCart();
          }
          reset();
        } catch (error) {
          console.error('결제 확인 실패', error);
        }
      }
    };

    checkPayment();
  }, [type, location.search]);

  return (
    <Container>
      {type == 'success' ? (
        <>
          <BsFillCheckCircleFill size={80} color={theme.color.main} />
          <Title>결제에 성공하였습니다.</Title>
          <Button textSize="1.5rem" onClick={() => navigate('/shop', { replace: true })}>
            홈으로
          </Button>
        </>
      ) : (
        <>
          <MdError size={80} color={theme.color.red} />
          <Title>결제에 실패하였습니다.</Title>
          <Button
            color={theme.color.red}
            textSize="1.5rem"
            onClick={() => navigate('/shop', { replace: true })}
          >
            홈으로
          </Button>
        </>
      )}
    </Container>
  );
};

export default ShopPaymentResult;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  gap: 4.5rem;

  button {
    margin-top: 3rem;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 2rem;
`;
