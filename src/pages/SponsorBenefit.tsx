import styled from '@emotion/styled';
import { Pagination, Table, Title } from '../shared/ui';
import { LuSearchX } from 'react-icons/lu';
import theme from '../shared/styles/theme';
import dayjs from 'dayjs';
import { publishColumns } from '../features/sponsor/benefit/model/PublishColumn';
import { useEffect, useState } from 'react';
import { PublishResDto } from '../features/sponsor/benefit/type/Publish';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SIZE = 10;

const SponsorBenefit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [data, setData] = useState<PublishResDto[]>([]); // 페이지 데이터

  // URL쿼리 생성 함수
  const buildQueryParams = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    return urlParams;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams(page);
    navigate(`/sponsor/benefit?${updatedParams.toString()}`);
  };

  useEffect(() => {
    // 예시
    const result: PublishResDto[] = [
      {
        benefitCode: 'U1120122X',
        benefitTitle: '2025년 초코우유 이벤트',
        benefitProduct: '초코우유',
        benefitContent: '구매 시 3% 할인',
        createdAt: '2025-03-11',
        endAt: '2025-04-12',
        benefitCount: '100개',
      },
      {
        benefitCode: 'U11201221',
        benefitTitle: '2025년 딸기우유 이벤트',
        benefitProduct: '딸기우유',
        benefitContent: '구매 시 5% 할인',
        createdAt: '2025-03-11',
        endAt: '2025-04-12',
        benefitCount: '50개',
      },
    ];
    setData(result);
    setTotalElements(result.length);
  }, []);

  return (
    <Container>
      {' '}
      <Title main="전체 발행내역" sub="발행한 협찬 내역을 확인해보세요." />
      <DataCount>총 {totalElements.toLocaleString()}건</DataCount>
      {/** 발행내역 테이블 */}
      {data.length == 0 ? (
        <EmptyContent>
          <LuSearchX size={40} color={theme.color.main} />
          <div className="empty-title">혜택 발행 리스트가 없습니다.</div>
          <div className="empty-subTitle">혜택을 발행하면 내역이 추가됩니다.</div>
        </EmptyContent>
      ) : (
        <div className="table">
          <Table
            columns={publishColumns}
            data={data}
            rowKey="benefitCode"
            renderCell={(key, value) => {
              if (key === 'createdAt' || key === 'endAt') return dayjs(value).format('YYYY-MM-DD'); //발행일, 종료일
              if (key === 'benefitTitle' || key === 'benefitContent' || key === 'benefitProduct') {
                // 협찬명 , 협찬내용
                return <WrapCell>{value}</WrapCell>;
              }
              return value;
            }}
          />
        </div>
      )}
      {/** 페이징 컴포넌트*/}
      <Pagination
        page={page}
        size={SIZE}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SponsorBenefit;

const Container = styled.div`
  width: 95vw;
  max-width: 75rem;
  min-height: 80vh;
  margin: 5rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .table {
    width: 100%;
    display: flex;
    overflow-x: auto;
  }
`;

const DataCount = styled.div`
  color: #595959;
  font-weight: 500;
  font-size: 1.25rem;
`;

const WrapCell = styled.div`
  word-break: break-word;
  white-space: normal;
  max-width: 10rem;
  margin: 0 auto;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 5rem auto 0 auto;
  font-size: 1.75rem;
  font-weight: 500;

  .empty-subTitle {
    font-size: 1rem;
    font-weight: 300;
  }
`;
