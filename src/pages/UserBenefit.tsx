import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Pagination, Table, Title } from '../shared/ui';
import { AvailableList } from '../features/user/benefit/ui/AvailableList';
import { Benefit } from '../features/user/benefit/type/Benefit';
import { toast } from 'react-toastify';
import { benefitColumns } from '../features/user/benefit/model/BenefitColumns';
import dayjs from 'dayjs';
import useDevice from '../shared/hooks/useDevice';

const result: { CardBenefitResDtos: Benefit[] } = {
  CardBenefitResDtos: [
    {
      cardBenefitId: 1,
      updatedAt: '2025-04-15T12:00:00Z',
      benefitName: '10% 할인',
      company: '버거킹',
      expired: '사용가능',
      status: '사용가능',
    },
    {
      cardBenefitId: 2,
      updatedAt: '2025-04-15T12:00:00Z',
      benefitName: '10% 할인',
      company: '버거킹',
      expired: '사용가능',
      status: '사용가능',
    },
    {
      cardBenefitId: 3,
      updatedAt: '2025-04-15T12:00:00Z',
      benefitName: '10% 할인',
      company: '버거킹',
      expired: '사용가능',
      status: '사용붉가',
    },
    {
      cardBenefitId: 4,
      updatedAt: '2025-04-15T12:00:00Z',
      benefitName: '10% 할인',
      company: '버거킹',
      expired: '사용가능',
      status: '사용가능',
    },
    {
      cardBenefitId: 5,
      updatedAt: '2025-04-15T12:00:00Z',
      benefitName: '10% 할인',
      company: '버거킹',
      expired: '사용가능',
      status: '사용가능',
    },
  ],
};

const SIZE = 10;

const UserBenefit = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [benefits, setBenefits] = useState<Benefit[]>([]); // 혜택
  const [availableBenefits, setAvailableBenefits] = useState<Benefit[]>([]); // 사용가능한 혜택

  // URL쿼리 생성 함수
  const buildQueryParams = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    urlParams.set('size', SIZE.toString());

    return urlParams;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams(page);
    navigate(`/benefit?${updatedParams.toString()}`);
  };

  const fetchBenefits = () => {
    // (임시 API)
    try {
      // const query = buildQueryParams(page);
      // const { result } = await axios.get(`/cards/me/benefits?${query.toString()}`);

      // 임시데이터
      setBenefits(result.CardBenefitResDtos);
      setTotalElements(result.CardBenefitResDtos.length);
    } catch (error) {
      toast.error('혜택을 불러오는데 실패했습니다.');
    }
  };

  const fetchAvailableBenefits = () => {
    // 임시 API
    try {
      const available = result.CardBenefitResDtos.filter(
        (benefit) => benefit.status === '사용가능',
      );
      // 임시데이터
      setAvailableBenefits(available);
    } catch (error) {
      toast.error('사용가능 혜택을 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    // 페이지 이동 시, 새로운 혜택 데이터 불러옴
    fetchBenefits();
  }, [page]);

  useEffect(() => {
    // 사용가능한 혜택만 불러옴.
    fetchAvailableBenefits();
  }, []);

  return (
    <Container>
      <Title main="혜택 히스토리" sub="업데이트 된 카드 혜택 내역을 확인해보세요." />
      <Content isMobile={isMobile}>
        {/** 사용가능 혜택 */}
        <div className="available-benefit-list">
          <AvailableList data={availableBenefits} />
        </div>
        {/** 전체 혜택 */}
        <div className="benefit-list">
          <div className="table">
            <Table
              columns={benefitColumns}
              data={benefits}
              rowKey="cardBenefitId"
              renderCell={(key, value) => {
                if (key === 'updatedAt') return dayjs(value).format('YYYY-MM-DD');
                return value;
              }}
            />
          </div>
          <Pagination
            page={page}
            size={SIZE}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </div>
      </Content>
    </Container>
  );
};

export default UserBenefit;

const Container = styled.div`
  width: 95vw;
  max-width: 75rem;
  height: 100vh;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Content = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: ${(props) => (props.isMobile ? 'none' : 'space-between')};
  gap: 5rem;

  .available-benefit-list {
    width: 100%;
    max-width: 25rem;
  }

  .benefit-list {
    width: 100%;
    max-width: 47rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .table {
      width: 100%;
      display: flex;
      overflow-x: auto;
    }
  }
`;
