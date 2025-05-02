import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import {
  ANONYMOUS,
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { Button } from '../shared/ui';
import { useAuthStore, usePendingStore } from '../shared/store';
import { useNavigate } from 'react-router-dom';
import theme from '../shared/styles/theme';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; // 클라이언트 키

const ShopPayment = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, paymentInfo, orderCode } = usePendingStore();

  /**
   * 토스 위젯
   */
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, String(user?.memberId) || ANONYMOUS);
      paymentWidgetRef.current = paymentWidget;

      paymentWidget.renderPaymentMethods('#payment-widget', { value: paymentInfo.orderPrice }); // 금액 설정
    })();
  }, []);

  // 결제 취소
  const handleCancel = () => {
    navigate('/shop');
    usePendingStore.getState().reset(); // 결제 대기 상품 취소
  };

  // 결제 진행
  const handlePayment = async () => {
    if (!paymentWidgetRef.current) return;
    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: orderCode, // orderCode
        orderName: paymentInfo.orderName, // orderName
        customerName: user?.memberName,
        successUrl: `${window.location.origin}/shop/pay/success`,
        failUrl: `${window.location.origin}/shop/pay/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>결제를 진행해주세요!</h2>
      <div className="item-content">
        <Img>{items[0].imageUrl && <img src={items[0].imageUrl} />}</Img>
        <OrderName>{paymentInfo.orderName}</OrderName>
        <TotalPrice>총 {paymentInfo.orderPrice.toLocaleString()}원</TotalPrice>
      </div>

      <PaymentBox id="payment-widget" />
      <div className="button-wrapper">
        <Button color="#E4E4E4" textColor="#999999" width="20rem" onClick={handleCancel}>
          취소하기
        </Button>
        <Button width="20rem" onClick={handlePayment}>
          결제하기
        </Button>
      </div>
    </Container>
  );
};

export default ShopPayment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90vw;
  max-width: 60rem;
  padding: 2% 0;
  margin: 0 auto;

  .item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    gap: 2rem;

    button {
      max-width: 70%;
    }
  }
`;

const PaymentBox = styled.div`
  width: 100%;
  max-width: 50rem;
  max-height: 50rem;
`;

const Img = styled.div`
  max-width: 10rem;
  max-height: 10rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderName = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

const TotalPrice = styled.div`
  color: ${theme.color.main};
  font-weight: 600;
  font-size: 1.5rem;
`;
