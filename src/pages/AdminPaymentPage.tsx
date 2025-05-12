import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from '@emotion/styled';
import { Title } from '../shared/ui';
import { Keyword } from '../features/admin/payment/type/Keyword';
import { SearchBar } from '../features/admin/payment/ui/SearchBar';
import { toast } from 'react-toastify';
import { Table } from '../shared/ui';
import theme from '../shared/styles/theme';
import dayjs from 'dayjs';
import Pagination from '../shared/ui/Pagination';
import { LuSearchX } from 'react-icons/lu';
import { TotalPaymentResDto } from '../features/admin/payment/type/TotalPayment';
import { totalPaymentColumns } from '../features/admin/payment/model/TotalPaymentColumn';
import { useGetPayment } from '../features/admin/payment/api/useGetPayment';
import Loading from './Loading';

const SIZE = 10;

const AdminPaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, getTotalPaymentList } = useGetPayment();

  // URL 파라미터에서 초기 상태 파싱
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialKeyword: Keyword = {
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null,
    loginId: searchParams.get('loginId') || '',
  };

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [data, setData] = useState<TotalPaymentResDto[]>([]); // 데이터 (단위 : 한페이지 당 10개의 데이터)
  const [keyword, setKeyword] = useState<Keyword>(initialKeyword); // (입력중) 검색 키워드
  const [searchKeyword, setSearchKeyword] = useState<Keyword>(initialKeyword); // (입력완료) 검색 키워드

  // URL쿼리 생성 함수
  const buildQueryParams = (params: { page: number; keyword: Keyword }) => {
    const { startDate, endDate, loginId } = params.keyword;
    const urlParams = new URLSearchParams();
    urlParams.set('page', params.page.toString());

    if (startDate) urlParams.set('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    if (endDate) urlParams.set('endDate', dayjs(endDate).format('YYYY-MM-DD'));
    if (loginId) urlParams.set('userId', loginId);

    return urlParams;
  };

  /**
   * 검색 관련 함수 (검색어, 페이징)
   */
  const handleSearch = () => {
    if (!keyword.loginId && (!keyword.startDate || !keyword.endDate)) {
      toast.error('검색 조건을 올바르게 입력해주세요.');
      return;
    }
    const newParams = buildQueryParams({ page: 1, keyword });
    navigate(`/manage/payments?${newParams.toString()}`);
    setPage(1);
    setSearchKeyword(keyword);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams({ page: newPage, keyword: searchKeyword });
    navigate(`/manage/payments?${updatedParams.toString()}`);
  };

  /** ----------- (임시) 결제내역 불러오기 API -------------- */
  const fetchPayments = async () => {
    const result = await getTotalPaymentList({
      page: page - 1,
      size: SIZE,
      loginId: searchKeyword.loginId,
      startDate: searchKeyword.startDate
        ? dayjs(searchKeyword.startDate).format('YYYY-MM-DD')
        : undefined,
      endDate: searchKeyword.endDate
        ? dayjs(searchKeyword.endDate).format('YYYY-MM-DD')
        : undefined,
    });
    setData(result.payments);
    setTotalElements(result.totalElements);
  };

  useEffect(() => {
    fetchPayments();
  }, [page, searchKeyword]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {/** 결제내역 타이틀 */}
      <Title main="결제내역" sub="유저가 결제한 내역을 확인해보세요." />

      {/** 결제내역 검색 */}
      <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
      <DataCount>총 {totalElements.toLocaleString()}건의 결과</DataCount>

      {/** 결제내역 테이블 */}
      {data.length == 0 ? (
        <EmptyContent>
          <LuSearchX size={40} color={theme.color.main} />
          <div className="empty-title">결제내역 리스트가 없습니다.</div>
          <div className="empty-subTitle">유저가 쇼핑을 하면 결제내역이 추가됩니다.</div>
        </EmptyContent>
      ) : (
        <div className="table">
          <Table
            columns={totalPaymentColumns}
            data={data}
            rowKey="orderCode"
            renderCell={(key, value) => {
              if (key === 'totalPrice') return `${value.toLocaleString()}원`;
              if (key === 'createAt') return dayjs(value).format('YYYY-MM-DD');
              if (key === 'orderCode' || key === 'sponsorName') {
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

export default AdminPaymentPage;

const Container = styled.div`
  width: 95vw;
  max-width: 75rem;
  min-height: 80vh;
  margin: 3rem auto;
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
