import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { Button } from '../shared/ui';
import theme from '../shared/styles/theme';
import { useCartStore, usePendingStore } from './../shared/store';
import { usePostPayment } from '../features/shop/cart/api/usePostPayment';
import Loading from './Loading';
import { toast } from 'react-toastify';

const ShopPaymentResult = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const { loading, postPayment } = usePostPayment();
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

  /** ----------- (API) 결제인증 ------------ */
  const didCheckRef = useRef(false); // 함수 실행 여부 체크
  useEffect(() => {
    const checkPayment = async () => {
      if (didCheckRef.current) return;
      didCheckRef.current = true;

      if (type === 'success') {
        try {
          const searchParams = new URLSearchParams(location.search);
          const orderCode = searchParams.get('orderId');
          const paymentKey = searchParams.get('paymentKey');
          const amount = searchParams.get('amount');

          if (!orderCode || !paymentKey || !amount) {
            toast.error('잘못된 요청입니다.');
            return;
          }

          const body = {
            orderCode,
            paymentKey,
            totalPrice: Number(amount),
          };

          await postPayment(body);
        } catch (e) {
          toast.error('결제 승인에 실패했습니다.');
        } finally {
          if (isCartPayment()) clearCart();
          reset();
        }
      } else {
        if (isCartPayment()) clearCart();
        reset();
      }
    };

    checkPayment();
  }, [type, location.search]);

  return loading ? (
    <Loading description="결제인증 중입니다. 잠시만 기다려주세요." />
  ) : (
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
