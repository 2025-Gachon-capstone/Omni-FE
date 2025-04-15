import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from '@emotion/styled';
import { Title } from '../shared/ui';
import { Keyword } from '../features/user/payment/type/Keyword';
import { SearchBar } from '../features/user/payment/ui/SearchBar';
import { toast } from 'react-toastify';
import { Table } from '../shared/ui';
import { PaymentResDto, AugmentedPayment } from '../features/user/payment/type/Payment';
import { paymentColumns } from '../features/user/payment/model/PaymentColumn';
import theme from '../shared/styles/theme';
import dayjs from 'dayjs';
import Pagination from '../shared/ui/Pagination';

// 임시데이터
const result: { PaymentResDtos: PaymentResDto[] } = {
  PaymentResDtos: [
    {
      paymentId: 1,
      createdAt: '2025-04-15T12:00:00Z',
      orderCode: 'ORDER12345',
      Items: [
        { orderId: 1, name: '버거킹 와퍼', price: 5000, quantity: 1 },
        { orderId: 2, name: '감자튀김', price: 5000, quantity: 2 },
      ],
      totalPrice: 15000,
      status: '결제 완료',
    },
    {
      paymentId: 2,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 3,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 4,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 5,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 6,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 7,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 8,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 9,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 10,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 11,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 12,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },

    {
      paymentId: 13,
      createdAt: '2025-04-14T10:00:00Z',
      orderCode: 'ORDER54321',
      Items: [{ orderId: 3, name: '치즈버거', price: 3000, quantity: 2 }],
      totalPrice: 6000,
      status: '결제 완료',
    },
  ],
};

const SIZE = 10;

const UserPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL 파라미터에서 초기 상태 파싱
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialKeyword: Keyword = {
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null,
    orderName: searchParams.get('orderName') || '',
  };

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [data, setData] = useState<AugmentedPayment[]>([]); // 데이터 (단위 : 한페이지 당 10개의 데이터)
  const [keyword, setKeyword] = useState<Keyword>(initialKeyword); // (입력중) 검색 키워드
  const [searchKeyword, setSearchKeyword] = useState<Keyword>(initialKeyword); // (입력완료) 검색 키워드

  // URL쿼리 생성 함수
  const buildQueryParams = (params: { page: number; keyword: Keyword }) => {
    const { startDate, endDate, orderName } = params.keyword;
    const urlParams = new URLSearchParams();
    urlParams.set('page', params.page.toString());
    urlParams.set('size', SIZE.toString());

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
    // (임시 API)
    try {
      // const query = buildQueryParams({ page, keyword: searchKeyword });
      // const { result } = await axios.get(`/payments?${query.toString()}`);

      // 데이터 변환 (.. 외 건) =  서버에서 받아온 데이터 할당..
      const tableData: AugmentedPayment[] = result.PaymentResDtos.map((payment) => {
        const firstItem = payment.Items[0];
        const extra = payment.Items.length > 1 ? ` 외 ${payment.Items.length - 1}건` : '';
        return {
          ...payment,
          itemsSummary: `${firstItem.name}${extra}`,
        };
      });
      // 임시데이터 사용
      setData(tableData.slice(0, SIZE));
      setTotalElements(result.PaymentResDtos.length); // result.totalElements
    } catch (error) {
      toast.error('결제 내역을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, searchKeyword]);

  return (
    <Container>
      {/** 결제내역 타이틀 */}
      <Title main="결제내역" sub="유저가 결제한 내역을 확인해보세요." />

      {/** 결제내역 검색 */}
      <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
      <DataCount>총 {totalElements.toLocaleString()}건의 결과</DataCount>

      {/** 결제내역 테이블 */}
      <div className="table">
        <Table
          columns={paymentColumns}
          data={data}
          rowKey="paymentId"
          renderCell={(key, value) => {
            if (key === 'totalPrice') return `${value.toLocaleString()}원`;
            if (key === 'createdAt') return dayjs(value).format('YYYY-MM-DD');
            if (key === 'status') {
              let color, bgColor;
              if (value === '결제 완료') {
                color = `${theme.color.main}`;
                bgColor = '#E8F3FF';
              } else if (value === '결제 취소') {
                color = `${theme.color.red}`;
                bgColor = '#FFE8E8';
              }
              return (
                <StatusBadge color={color || '#959595'} bgColor={bgColor || '#E8E8E8'}>
                  {value}
                </StatusBadge>
              );
            }
            return value;
          }}
        />
      </div>
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
  min-height: 100vh;
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
