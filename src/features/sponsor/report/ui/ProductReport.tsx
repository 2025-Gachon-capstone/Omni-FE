import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { StepGuide } from './StepGuide';

export const ProductReport = () => {
  const [params] = useSearchParams();
  const productName = params.get('name');

  return (
    <ContentWrapper>
      {/** 제품명 헤더 및 단계 */}
      <HeaderWrapper>
        <Header>{productName}</Header>
        <StepGuide />
      </HeaderWrapper>
      {/** 제품 최근 100건 판매 통계 */}
      {/** AI 리포트 */}
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  padding: 7rem 4.8rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
`;
