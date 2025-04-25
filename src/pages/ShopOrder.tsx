import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartList } from '../features/shop/cart/ui/CartList';
import { BenefitApply } from '../features/shop/cart/ui/BenefitApply';
import { PriceBox } from '../features/shop/cart/ui/PriceBox';
import { Button } from '../shared/ui';
import { usePendingStore } from '../shared/store';

const ShopOrder = () => {
  const { setItems, setPaymentInfo, setOrderCode } = usePendingStore();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const count = searchParams.get('count');

  const [cardNumber, setCardNumber] = useState(''); // 카드번호
  const [discountRate, setDiscountRate] = useState(0); // 서버에서 받아올 할인율
  const [isApply, setIsApply] = useState(false); // 혜택 적용 여부

  // (임시) 주문 데이터 불러오기
  const serverProductList = productId
    ? [
        {
          productId: Number(productId),
          departmentName: '생활',
          productName: '페리오치약너무 길면 어떻게 될까 확인용 텍스트',
          price: 4000,
          companyName: '이마트',
          image1: 'https://buly.kr/AF041k0',
        },
      ]
    : [];
  const productList = serverProductList.map((product) => ({
    ...product,
    count: Number(count),
    addToCartOrder: 1,
  }));

  // 1. 서버에서 가져온 할인율
  // 2. 계산하여 PriceBox 컴포넌트로 전달
  const initialPrice = productList.length > 0 ? productList[0].price * Number(count) : 0;
  const discountAmount = initialPrice * discountRate;
  const totalPrice = initialPrice - discountAmount;

  // 글자수 제한 함수
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const orderName =
    productList.length === 1
      ? truncate(productList[0].productName, 10)
      : `${truncate(productList[0].productName, 10)} 외 ${productList.length - 1}개`;

  // 주문 생성
  const handlePay = () => {
    setItems(productList); // 주문상품 임시저장
    setPaymentInfo({ cardNumber: cardNumber, orderName: orderName, totalPrice: totalPrice });

    // 주문생성 API req [ cardName, orderName, items, totalPrice ]
    // const body = {
    //   cardNumber: cardNumber,
    //   orderName: orderName,
    //   items: productList.map((product) => ({
    //     productId: product.productId,
    //     quantity: product.count,
    //   })),
    //   totalPrice: totalPrice,
    // };
    // await privateAxios('/payment/v1/orders',body)
    const generateRandomString = () => {
      return window.btoa(Math.random().toString()).slice(0, 20);
    };
    setOrderCode(generateRandomString()); // (임시) 서버응답값 orderId으로 교체 예정
    navigate('/shop/pay');
  };
  return (
    <Container>
      <Title>주문내역을 확인해주세요.</Title>
      <CartList productList={productList} type="order" />
      <BenefitApply
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        isApply={setIsApply}
        setDiscountRate={setDiscountRate}
      />
      <PriceBox initial={initialPrice} discount={discountAmount} total={totalPrice} />
      <div className="button-wrapper">
        <Button onClick={handlePay} width="15rem" disabled={!isApply}>
          결제하기
        </Button>
      </div>
    </Container>
  );
};

export default ShopOrder;

const Container = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .button-wrapper {
    width: 100%;
    max-width: 75rem;
    margin: 4rem auto 2rem auto;
    display: flex;
    justify-content: flex-end;
  }
`;

const Title = styled.div`
  margin: 1.5rem auto;
  padding: 2rem 0;
  font-size: 2rem;
  font-weight: 600;
`;
