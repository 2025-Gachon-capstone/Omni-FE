import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../features/sponsor/report/ui/ProductList';
import { ProductReport } from '../features/sponsor/report/ui/ProductReport';

// (수정) 목록불러오기 useCallback
const products = [
  {
    productId: 0,
    productName: '딸기우유',
  },
  { productId: 1, productName: '초코우유' },
  { productId: 2, productName: '메론우유' },
];

const SponsorReport = () => {
  const [params] = useSearchParams();
  const rawParams = params.get('productId');
  const selectedId = rawParams !== null ? Number(rawParams) : null; // 선택된 제품 ID
  const step = params.get('step') || '1'; // 발행 단계 (1,2)

  useEffect(() => {
    // 선택된 제품의 (AI) 리포트 내역 불러오기
  }, [selectedId]);

  return (
    <PageWrapper>
      {/** 제품 리스트 영역 */}
      <ProductList products={products} selectedId={selectedId} />
      <ContentWrapper>
        {selectedId == null ? (
          <>
            {/** (제품 미선택) 콘텐츠 영역 */}
            <EmptyContent>혜택을 생성할 제품을 선택해주세요.</EmptyContent>
          </>
        ) : (
          <>
            {/** 콘텐츠 영역 */}
            {step == '1' && <ProductReport />}
            {step == '2' && <></>}
          </>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default SponsorReport;

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative;
`;

const ContentWrapper = styled.div`
  grid-column: 2;
  position: relative;
  min-height: 80vh;
`;

const EmptyContent = styled.div`
  position: absolute;
  top: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
  color: #cfcfcf;
  font-size: 1.5rem;
  font-weight: 500;
`;
