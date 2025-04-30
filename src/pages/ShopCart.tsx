import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CartList } from '../features/shop/cart/ui/CartList';
import { BenefitApply } from '../features/shop/cart/ui/BenefitApply';
import { PriceBox } from '../features/shop/cart/ui/PriceBox';
import { Button } from '../shared/ui';
import { useCartStore, usePendingStore } from '../shared/store';
import { FaBasketShopping } from 'react-icons/fa6';
import theme from '../shared/styles/theme';
import { useNavigate } from 'react-router-dom';

const ShopCart = () => {
  const navigate = useNavigate();
  const productList = useCartStore((state) => state.items); // 장바구니 데이터 불러오기
  const { setItems, setPaymentInfo, setOrderCode } = usePendingStore();

  const [cardNumber, setCardNumber] = useState(''); // 카드번호
  const [isApply, setIsApply] = useState(false); // 혜택 적용 여부

  // 1. 서버에서 가져온 할인율
  // 2. 계산하여 PriceBox 컴포넌트로 전달
  const [initialPrice, setInitialPrice] = useState(0); // 초기 금액
  const [discount, setDiscount] = useState(0); // 할인 금액
  const [orderPrice, setOrderPrice] = useState(initialPrice); // 최종 금액

  useEffect(() => {
    const total = productList.reduce((acc, cur) => acc + cur.count * cur.productPrice, 0);
    setInitialPrice(total);
    setOrderPrice(total); // 할인 미적용 상태로 재설정
    setDiscount(0); // 할인 초기화
    setIsApply(false); // 혜택 적용 해제
  }, [productList]);

  // 결제하기 API
  // 글자수 제한 함수
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const orderName =
    productList.length > 0
      ? productList.length === 1
        ? truncate(productList[0].productName, 10)
        : `${truncate(productList[0].productName, 10)} 외 ${productList.length - 1}개`
      : '';

  // 주문 생성
  const handlePay = () => {
    setItems(productList); // 주문상품 임시저장
    setPaymentInfo({ cardNumber: cardNumber, orderName: orderName, orderPrice: orderPrice });

    // 주문생성 API req [ cardName, orderName, items, orderPrice ]
    // const body = {
    //   cardNumber: cardNumber,
    //   orderName: orderName,
    //   items: productList.map((product) => ({
    //     productId: product.productId,
    //     quantity: product.count,
    //   })),
    //   orderPrice: orderPrice,
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
      <Title>장바구니 내역을 확인해주세요.</Title>
      {productList?.length > 0 ? (
        <CartList productList={productList} type="cart" />
      ) : (
        <EmptyCart>
          <FaBasketShopping size={100} color={theme.color.main} />
          <div className="empty-phrase">장바구니에 담긴 상품이 없어요.</div>
        </EmptyCart>
      )}
      <BenefitApply
        productList={productList}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        isApply={setIsApply}
        initial={initialPrice}
        setDiscount={setDiscount}
        setOrderPrice={setOrderPrice}
      />
      <PriceBox initial={initialPrice} discount={discount} total={orderPrice} />
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
