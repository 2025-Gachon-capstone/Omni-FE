import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from '@emotion/styled';
import { Title } from '../shared/ui';
import { Keyword } from '../features/user/payment/type/Keyword';
import { SearchBar } from '../features/user/payment/ui/SearchBar';
import { toast } from 'react-toastify';
import { Table } from '../shared/ui';
import { PaymentResDto } from '../features/user/payment/type/Payment';
import { paymentColumns } from '../features/user/payment/model/PaymentColumn';
import theme from '../shared/styles/theme';
import dayjs from 'dayjs';
import Pagination from '../shared/ui/Pagination';
import { usePaymentList } from '../features/user/payment/api/usePaymentList';
import { LuSearchX } from 'react-icons/lu';
import Loading from './Loading';

const SIZE = 10;

const UserPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, getPaymentList } = usePaymentList();

  // URL 파라미터에서 초기 상태 파싱
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialKeyword: Keyword = {
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null,
    orderName: searchParams.get('orderName') || '',
  };

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [data, setData] = useState<PaymentResDto[]>([]); // 데이터 (단위 : 한페이지 당 10개의 데이터)
  const [keyword, setKeyword] = useState<Keyword>(initialKeyword); // (입력중) 검색 키워드
  const [searchKeyword, setSearchKeyword] = useState<Keyword>(initialKeyword); // (입력완료) 검색 키워드

  // URL쿼리 생성 함수
  const buildQueryParams = (params: { page: number; keyword: Keyword }) => {
    const { startDate, endDate, orderName } = params.keyword;
    const urlParams = new URLSearchParams();
    urlParams.set('page', params.page.toString());

    if (startDate) urlParams.set('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    if (endDate) urlParams.set('endDate', dayjs(endDate).format('YYYY-MM-DD'));
    if (orderName) urlParams.set('orderName', orderName);

    return urlParams;
  };

  /**
   * 검색 관련 함수 (검색어, 페이징)
   */
  const handleSearch = () => {
    if (!keyword.orderName && (!keyword.startDate || !keyword.endDate)) {
      toast.error('검색 조건을 올바르게 입력해주세요.');
      return;
    }
    const newParams = buildQueryParams({ page: 1, keyword });
    navigate(`/payment?${newParams.toString()}`);
    setPage(1);
    setSearchKeyword(keyword);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams({ page: newPage, keyword: searchKeyword });
    navigate(`/payment?${updatedParams.toString()}`);
  };

  const fetchPayments = async () => {
    const result = await getPaymentList({
      page: page - 1,
      size: SIZE,
      orderName: searchKeyword.orderName,
      startDate: searchKeyword.startDate
        ? dayjs(searchKeyword.startDate).format('YYYY-MM-DD')
        : undefined,
      endDate: searchKeyword.endDate
        ? dayjs(searchKeyword.endDate).format('YYYY-MM-DD')
        : undefined,
    });
    setData(result.Items);
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
          <div className="empty-subTitle">쇼핑을 하면 결제내역이 추가됩니다.</div>
        </EmptyContent>
      ) : (
        <div className="table">
          <Table
            columns={paymentColumns}
            data={data}
            rowKey="paymentId"
            renderCell={(key, value) => {
              if (key === 'paymentPrice') return `${value.toLocaleString()}원`;
              if (key === 'createdAt') return dayjs(value).format('YYYY-MM-DD');
              if (key === 'paymentStatus') {
                let color, bgColor, title;
                if (value === 'SUCCESS') {
                  color = `${theme.color.main}`;
                  bgColor = '#E8F3FF';
                  title = '결제완료';
                } else {
                  color = `${theme.color.red}`;
                  bgColor = '#FFE8E8';
                  title = '결제실패';
                }
                return (
                  <StatusBadge color={color || '#959595'} bgColor={bgColor || '#E8E8E8'}>
                    {title}
                  </StatusBadge>
                );
              }
              if (key === 'orderCode') {
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

export default UserPayment;

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

const StatusBadge = styled.span<{ color: string; bgColor: string }>`
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
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
