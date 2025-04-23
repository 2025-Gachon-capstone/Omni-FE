import styled from '@emotion/styled';
import { useState } from 'react';
import { CartList } from '../features/shop/cart/ui/CartList';
import { BenefitApply } from '../features/shop/cart/ui/BenefitApply';
import { PriceBox } from '../features/shop/cart/ui/PriceBox';
import { Button } from '../shared/ui';
import { useCartStore } from '../shared/store';
import { FaBasketShopping } from 'react-icons/fa6';
import theme from '../shared/styles/theme';

const ShopCart = () => {
  const productList = useCartStore((state) => state.items); // 장바구니 데이터 불러오기

  const [cardNumber, setCardNumber] = useState(''); // 카드번호
  const [discountRate, setDiscountRate] = useState(0); // 서버에서 받아올 할인율
  const [isApply, setIsApply] = useState(false); // 혜택 적용 여부

  // 1. 서버에서 가져온 할인율
  // 2. 계산하여 PriceBox 컴포넌트로 전달
  const initialPrice = productList.reduce((acc, cur) => acc + cur.count * cur.price, 0);
  const discountAmount = initialPrice * discountRate; // 할인율 적용로직은 달라질 수 있음.
  const totalPrice = initialPrice - discountAmount;

  // 결제하기 API
  const handlePay = () => {};

  return (
    <Container>
      <Title>장바구니 내역을 확인해주세요.</Title>
      {productList.length > 0 ? (
        <CartList productList={productList} type="cart" onDelete={() => setIsApply(false)} />
      ) : (
        <EmptyCart>
          <FaBasketShopping size={100} color={theme.color.main} />
          <div className="empty-phrase">장바구니에 담긴 상품이 없어요.</div>
        </EmptyCart>
      )}
      <BenefitApply
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        isApply={setIsApply}
        setDiscountRate={setDiscountRate}
      />
      <PriceBox initial={initialPrice} discount={discountAmount} total={totalPrice} />
      <div className="button-wrapper">
        <Button onClick={handlePay} width="15rem" disabled={productList.length <= 0 || !isApply}>
          결제하기
        </Button>
      </div>
    </Container>
  );
};

export default ShopCart;

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

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 8rem 0 10rem 0;
  .empty-phrase {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
