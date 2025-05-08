import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartList } from '../features/shop/cart/ui/CartList';
import { BenefitApply } from '../features/shop/cart/ui/BenefitApply';
import { PriceBox } from '../features/shop/cart/ui/PriceBox';
import { Button } from '../shared/ui';
import { usePendingStore } from '../shared/store';
import { useGetProductDetail } from '../features/shop/detail/api/useGetProductDetail';
import Loading from './Loading';
import { usePostOrder } from '../features/shop/cart/api/usePostOrder';

const ShopOrder = () => {
  const { setItems, setPaymentInfo, setOrderCode } = usePendingStore();
  const { postOrder } = usePostOrder();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId')) || null;
  const count = Number(searchParams.get('count')) || null;

  const [cardNumber, setCardNumber] = useState(''); // 카드번호
  const [discount, setDiscount] = useState(0); // 할인 금액
  const [orderPrice, setOrderPrice] = useState(0); // 최종 금액
  const [isApply, setIsApply] = useState(false); // 혜택 적용 여부

  /** ------- (API) 상품 데이터 불러오기 ------ */
  const [productList, setProductList] = useState<CartItem[]>([]);
  const { loading, data } = useGetProductDetail(productId);

  useEffect(() => {
    if (data && Number(count) > 0) {
      const list: CartItem[] = [
        {
          ...data,
          count: Number(count),
          addToCartOrder: 1,
        },
      ];
      setProductList(list);
      setOrderPrice(data.productPrice * Number(count));
    }
  }, [data, count]);

  const initialPrice = useMemo(() => {
    return productList.length > 0 ? productList[0].productPrice * productList[0].count : 0;
  }, [productList]);

  /** --------- (API) 주문 생성 ---------- */
  // 글자수 제한 함수
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handlePay = async () => {
    const orderName =
      productList.length === 1
        ? truncate(productList[0].productName, 10)
        : `${truncate(productList[0].productName, 10)} 외 ${productList.length - 1}개`;

    setItems(productList); // 주문상품 임시저장
    setPaymentInfo({ cardNumber: cardNumber, orderName: orderName, orderPrice: orderPrice });

    // 주문생성 API req [ cardName, orderName, items, orderPrice ]
    const body = {
      cardNumber: cardNumber.replace(/-/g, ''),
      orderName: orderName,
      items: productList.map((product) => {
        return {
          productId: product.productId,
          quantity: product.count,
          addToCartOrder: product.addToCartOrder,
        };
      }),
      orderPrice: orderPrice,
    };

    const result = await postOrder(body);
    if (result.orderCode !== null) {
      setOrderCode(result.orderCode);
      navigate('/shop/pay');
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Title>주문내역을 확인해주세요.</Title>
      <CartList productList={productList} type="order" />
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
