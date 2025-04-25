import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import theme from '../../../../shared/styles/theme';
import { Button } from '../../../../shared/ui';
import { ProductCount } from './ProductCount';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../../shared/store';
import { BsEmojiSmile } from 'react-icons/bs';
import Modal from '../../../../shared/ui/Modal';

export const ProductInfo = ({ product }: { product: ProductItem }) => {
  const navigate = useNavigate();
  const { addItem, items } = useCartStore((state) => state);
  const cartItems = useMemo(() => items.map((item) => item.productId), [items]);

  const [count, setCount] = useState(1); // 상품 개수
  const [totalPrice, setTotalPrice] = useState(product.price); // 상품 총 가격
  const [isCartIn, setIsCartIn] = useState(false); // 장바구니 존재여부
  const [isOpen, setIsOpen] = useState(false); // 모달창

  // 1. 장바구니 추가
  const handleToCart = () => {
    addItem({
      productId: product.productId,
      departmentName: product.departmentName,
      productName: product.productName,
      companyName: product.companyName,
      image1: product.image1,
      count: count,
      addToCartOrder: items.length + 1,
      price: product.price,
    });
    setIsOpen(false);
    navigate('/shop/cart'); // 장바구니 이동
  };

  // 2. 단독 주문
  const handleToOrder = () => {
    // 쿼리스트링으로 상품 id + 개수를 넘김.
    navigate(`/shop/order?productId=${product.productId}&count=${count}`);
  };

  useEffect(() => {
    setTotalPrice(product.price * count);
  }, [count, product.price]);

  useEffect(() => {
    if (product && cartItems.includes(product.productId)) {
      setIsCartIn(true);
    } else {
      setIsCartIn(false);
    }
  }, [cartItems, product.productId]);

  return (
    <>
      <Containter>
        {/** 상품 태그 */}
        <div className="tag-container">
          <Tag>{product.companyName}</Tag>
          <Tag>{product.departmentName}</Tag>
        </div>
        {/** 상품 정보 */}
        <div className="title-container">
          <Caption color={theme.color.bold_border} size="1rem" weight="500">
            상품번호&nbsp;{product.productId}
          </Caption>
          <Caption size="2rem" weight="600">
            {product.productName}
          </Caption>
          <Caption size="1.75rem" weight="400">
            {product.price.toLocaleString()}원
          </Caption>
        </div>
        {/** 상품 개수 */}
        <ProductCount
          price={product.price}
          count={count}
          decrease={() => setCount((prev) => Math.max(1, prev - 1))}
          increase={() => setCount((prev) => prev + 1)}
        />
        {/** 상품 총 가격 */}
        <div className="price-container">
          <Caption size="1.25rem" weight="500">
            총 상품 금액 ({count}개)
          </Caption>
          <Caption size="1.25rem" weight="500">
            ₩&nbsp;{totalPrice.toLocaleString()}
          </Caption>
        </div>
        {/** 버튼 */}
        <div className="button-container">
          <Button
            color="white"
            textColor={theme.color.main}
            border={`1px solid ${theme.color.main}`}
            onClick={() => setIsOpen(true)}
          >
            장바구니
          </Button>
          <Button onClick={handleToOrder}>구매하기</Button>
        </div>
        {product && isCartIn && (
          <BubbleBody>
            장바구니에 담긴 상품입니다.
            <Tail />
          </BubbleBody>
        )}
      </Containter>{' '}
      {isOpen && (
        <Modal
          icon={<BsEmojiSmile size={32} color={theme.color.main} />}
          buttons={[
            {
              text: '취소',
              onClick: () => setIsOpen(false),
              bgColor: 'white',
              textColor: '#7C7F86',
              border: '1px solid #7C7F86',
            },
            {
              text: '장바구니로',
              onClick: () => handleToCart(),
              bgColor: `${theme.color.main}`,
              textColor: 'white',
            },
          ]}
        >
          장바구니 담기 완료!
          <br />
          장바구니로 이동하시겠습니까?
        </Modal>
      )}
    </>
  );
};

const Containter = styled.div`
  width: 90%;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3rem;
  .tag-container {
    display: flex;
    gap: 0.75rem;
  }
  .title-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: black;
  }
  .price-container {
    display: flex;
    justify-content: space-between;
  }
  .button-container {
    display: flex;
    gap: 2rem;
  }
`;

const Tag = styled.div`
  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.color.main};
  border-radius: 20px;
  color: ${theme.color.main};
`;

const Caption = styled.div<{ color?: string; size: string; weight: string }>`
  color: ${(props) => props.color || 'black'};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
`;

const BubbleBody = styled.div`
  margin-top: 1rem;
  position: relative;
  max-width: 12rem;
  padding: 0.75rem 1rem;
  background-color: ${theme.color.main};
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const Tail = styled.div`
  position: absolute;
  top: -15px;
  left: 20px;
  border-bottom: 15px solid ${theme.color.main};
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
`;
