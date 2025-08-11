import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StepGuide } from './StepGuide';
import { ProductStatistics } from './ProductStatistics';
import { ProductAI } from './ProductAI';
import { Button } from '../../../../shared/ui';

/** (수정예정) 판매통계 데이터 불러오기-API */
const DATA = {
  reordered: [
    { label: 0, count: 100 },
    { label: 1, count: 50 },
  ],
  orderHour: [
    { label: 0, count: 10 },
    { label: 1, count: 30 }, // 생략...
    { label: 23, count: 20 },
  ],
  orderDow: [
    { label: 0, count: 20 },
    { label: 1, count: 3 },
    { label: 2, count: 34 },
    { label: 3, count: 50 },
    { label: 4, count: 14 },
    { label: 5, count: 5 },
    { label: 6, count: 30 },
  ],
  relatedProduct: [
    // 20개 제공
    {
      productId: 0,
      label: '상품1',
      count: 10,
    },
    {
      productId: 1,
      label: 'Smart Ones',
      count: 5,
    },
    {
      productId: 2,
      label: '상품11',
      count: 15,
    },
    {
      productId: 3,
      label: '바나나',
      count: 30,
    },
    {
      productId: 3,
      label: '딸기',
      count: 30,
    },
    {
      productId: 3,
      label: '수박',
      count: 10,
    },
  ],
  report: '맛깔난 리포트',
  period: {
    max: '2025.05.20',
    min: '2025.05.05',
  },
};

export const ProductReport = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productName = params.get('name');

  const handleNextStep = () => {
    const newParams = new URLSearchParams({
      productId: params.get('productId') ?? '',
      name: params.get('name') ?? '',
      step: '2',
    });

    navigate(`/sponsor/report?${newParams}`);
  };

  return (
    <ContentWrapper>
      {/** 제품명 헤더 및 단계 */}
      <HeaderWrapper>
        <Header>{productName}</Header>
        <StepGuide />
      </HeaderWrapper>
      {/** 제품 최근 100건 판매 통계 */}
      <ProductStatistics data={DATA} />
      {/** AI 리포트 */}
      <ProductAI report={DATA.report} />
      {/** 다음 단계 버튼 */}
      <ButtonBox>
        <Button width="10rem" padding="1rem" textSize="1rem" onClick={handleNextStep}>
          다음 단계로
        </Button>
      </ButtonBox>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  padding: 7rem 4.8rem 5rem 4.8rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
`;
