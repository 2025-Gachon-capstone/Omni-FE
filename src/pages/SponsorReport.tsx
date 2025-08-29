import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../features/sponsor/report/ui/ProductList';
import { ProductReport } from '../features/sponsor/report/ui/ProductReport';
import { CustomBenefit } from '../features/sponsor/report/ui/CustomBenefit';
import { StatisticsData } from '../features/sponsor/report/type/StatisticsType';
import { useGetProducts } from '../features/sponsor/report/api/useGetProducts';
import Loading from './Loading';

const SponsorReport = () => {
  const [params] = useSearchParams();
  const rawParams = params.get('productId');
  const selectedId = rawParams !== null ? Number(rawParams) : null; // 선택된 제품 ID
  const step = params.get('step') || '1'; // 발행 단계 (1,2)

  const { isLoading, getProductsReport } = useGetProducts();
  const [data, setData] = useState<StatisticsData | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (selectedId) {
        const result = await getProductsReport({ productId: selectedId });
        if (result) {
          setData(result);
        }
      }
    };
    fetchReport();
  }, [selectedId]);

  return (
    <PageWrapper>
      {/** 제품 리스트 영역 */}
      <ProductList selectedId={selectedId} />
      <ContentWrapper>
        {selectedId == null ? (
          <>
            {/** (제품 미선택) 콘텐츠 영역 */}
            <EmptyContent>혜택을 생성할 제품을 선택해주세요.</EmptyContent>
          </>
        ) : (
          <>
            {/* 로딩 및 데이터 유효성 검사 */}
            {isLoading || !data ? (
              <Loading
                description={step === '1' ? '통계데이터 불러오는 중' : '잠시만 기다려주세요'}
              />
            ) : (
              <>
                {step == '1' && <ProductReport data={data} />}
                {step == '2' && <CustomBenefit data={data.relatedProduct} />}
              </>
            )}
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
