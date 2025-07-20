import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDevice from '../shared/hooks/useDevice';
import styled from '@emotion/styled';
import { LuSearchX } from 'react-icons/lu';
import { Pagination, Table, Title } from '../shared/ui';
import theme from '../shared/styles/theme';
import { AvailableList } from '../features/user/benefit/ui/AvailableList';
import { Benefit } from '../features/user/benefit/type/Benefit';
import { benefitColumns } from '../features/user/benefit/model/BenefitColumns';
import dayjs from 'dayjs';
import { useBenefitList } from '../features/user/benefit/api/useBenefitList';
import Loading from './Loading';

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

  const { loading, getBenefitList, getAvailableBenefit } = useBenefitList();

  // URL쿼리 생성 함수
  const buildQueryParams = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    return urlParams;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams(page);
    navigate(`/benefit?${updatedParams.toString()}`);
  };

  const fetchBenefits = async () => {
    const result = await getBenefitList({ page: page - 1, size: SIZE });
    setBenefits(result.benefits || []);
    setTotalElements(result.totalElements);
  };

  const fetchAvailableBenefits = async () => {
    const result = await getAvailableBenefit();
    if (result.length !== 0) {
      setAvailableBenefits(result);
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

  return loading ? (
    <Loading />
  ) : (
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
            {benefits.length == 0 ? (
              <EmptyContent>
                <LuSearchX size={40} color={theme.color.main} />
                <div className="empty-title">혜택 리스트가 없습니다.</div>
                <div className="empty-subTitle">쇼핑을 하면 맞춤 혜택이 추가됩니다.</div>
              </EmptyContent>
            ) : (
              <Table
                columns={benefitColumns}
                data={benefits}
                rowKey="benefitId"
                renderCell={(key, value) => {
                  if (key === 'updatedAt') return dayjs(value).format('YYYY-MM-DD');
                  return value;
                }}
              />
            )}{' '}
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
  height: 80vh;
  margin: 5rem auto 0 auto;
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
