import styled from '@emotion/styled';
import { Button, Input } from '../../../../shared/ui';
import { toast } from 'react-toastify';

interface BenefitApplyProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  isApply: (value: boolean) => void;
  setDiscountRate: (rate: number) => void;
}

export const BenefitApply = ({
  cardNumber,
  setCardNumber,
  isApply,
  setDiscountRate,
}: BenefitApplyProps) => {
  const handleApply = () => {
    // 1. 카드번호 유효성 확인
    const exp = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    if (!exp.test(cardNumber)) {
      toast.error('올바른 형식을 입력해주세요.');
      return;
    }
    // 2. (추후 개발) 혜택 반영 API
    // case : 혜택 적용 / 적용 혜택 X / 카드 존재 X

    // (임시) 10% 할인 응답 받았다고 가정
    const responseDiscountRate = 0.1;

    setDiscountRate(responseDiscountRate); // 부모에 할인율 전달
    isApply(true);
  };

  return (
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
