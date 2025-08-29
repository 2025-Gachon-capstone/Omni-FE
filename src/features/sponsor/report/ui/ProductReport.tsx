import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StepGuide } from './StepGuide';
import { ProductStatistics } from './ProductStatistics';
import { ProductAI } from './ProductAI';
import { Button } from '../../../../shared/ui';
import { StatisticsData } from '../type/StatisticsType';

export const ProductReport = ({ data }: { data: StatisticsData }) => {
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
      <ProductStatistics data={data} />
      {/** AI 리포트 */}
      <ProductAI report={data.report} />
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
