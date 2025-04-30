import styled from '@emotion/styled';
import { Button, Input } from '../../../../shared/ui';
import { toast } from 'react-toastify';
import { useApplyBenefit } from '../api/useApplyBenefit';
import Loading from '../../../../pages/Loading';

interface BenefitApplyProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  productList: CartItem[];
  isApply: (value: boolean) => void;
  initial: number;
  setDiscount: (rate: number) => void;
  setOrderPrice: (total: number) => void;
}

export const BenefitApply = ({
  cardNumber,
  setCardNumber,
  productList,
  isApply,
  initial,
  setDiscount,
  setOrderPrice,
}: BenefitApplyProps) => {
  const { loading, applyBenefit } = useApplyBenefit();

  const handleApply = async () => {
    // 1. 카드번호 유효성 확인
    const exp = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    if (!exp.test(cardNumber)) {
      toast.error('올바른 형식을 입력해주세요.');
      return;
    }
    // 2. 혜택 반영 API
    const result = await applyBenefit(cardNumber.replace(/-/g, ''));
    if (!result) return;
    if (result.length == 0) {
      toast.error('적용할 혜택이 존재하지 않습니다.');
      isApply(true);
    }

    // 3. 혜택 적용 가능여부 판단
    let totalDiscount = 3000; // 총 할인 금액.

    productList.forEach((item) => {
      const matchedBenefit = result.find((benefit) => benefit.targetProduct === item.productName);

      if (matchedBenefit) {
        const discountForItem = item.productPrice * item.count * matchedBenefit.discountRate;
        totalDiscount += discountForItem;
      }
    });

    setDiscount(totalDiscount); // 부모에 할인금액 전달
    setOrderPrice(initial - totalDiscount); // 부모에 최종 금액 전달
    isApply(true);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <div className="title-container">
        <Title>혜택 적용</Title>
        <SubTitle>카드 번호를 입력해 혜택을 자동으로 적용해보세요.</SubTitle>
      </div>
      <div className="card-container">
        <Input
          styleType="outline"
          width="22rem"
          border="1px solid #E2E2E2"
          placeholder="카드번호를 입력해주세요. (- 포함)"
          value={cardNumber}
          onChange={(e) => {
            setCardNumber(e.target.value);
            isApply(false);
          }}
        />
        <Button width="5rem" onClick={handleApply}>
          적용
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .card-container {
    display: flex;
    gap: 0;
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const SubTitle = styled.div`
  color: #959595;
  font-weight: 400;
`;
