import styled from '@emotion/styled';
import { Pagination, Table, Title } from '../shared/ui';
import { LuSearchX } from 'react-icons/lu';
import theme from '../shared/styles/theme';
import dayjs from 'dayjs';
import { userCardColumns } from '../features/admin/card/model/UserCardColumn';
import { useEffect, useState } from 'react';
import { SelectedUserResDto, UserCardResDto } from '../features/admin/card/type/UserCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../shared/ui/Modal';
import { BsQuestionCircle } from 'react-icons/bs';
import UserInfoBox from '../features/admin/card/ui/UserInfoBox';

const SIZE = 10;

const AdminCardPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage); // 현재 페이지
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수
  const [data, setData] = useState<UserCardResDto[]>([]); // 페이지 데이터
  const [activeUserId, setActiveUserId] = useState(''); // 선택된 유저 id
  const [userData, setUserData] = useState<SelectedUserResDto>(); // 선택유저 데이터

  const [isOpen, setIsOpen] = useState(false); // 유저삭제 모달

  // URL쿼리 생성 함수
  const buildQueryParams = (page: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    return urlParams;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const updatedParams = buildQueryParams(page);
    navigate(`/manage/cards?${updatedParams.toString()}`);
  };

  /** ------------ (임시) 유저리스트 불러오기 API ------------ */
  useEffect(() => {
    const result: UserCardResDto[] = [
      {
        userCode: 'sdlksd',
        userId: 'user_1',
        userName: '홍길동',
        cardNumber: '1111111111111111',
        createdAt: '2025-01-01',
        currentBenefit: '초코우유 할인',
        status: 'active',
      },
      {
        userCode: 'asdfasfd',
        userId: 'user_2',
        userName: '김길동',
        cardNumber: '1111111111111112',
        createdAt: '2025-01-03',
        currentBenefit: '딸기우유 할인',
        status: 'delete',
      },
    ];
    setData(result);
    setTotalElements(2); // totalElement
  }, []);

  /** ------------- (임시) 선택유저 정보 불러오기 API -------------- */
  useEffect(() => {
    console.log(activeUserId);
    // 임시
    setUserData({
      userCode: 'asdfasfd',
      userId: 'user_2',
      userName: '김길동',
      cardNumber: '1111111111111112',
      createdAt: '2025-01-03',
      currentBenefit: [
        '딸기우유 할인',
        '아 졸리다,...흠냐',
        '그다음은.....',
        '엽떡먹고싶다.',
        '허콤추가요',
      ],
      status: 'delete',
    });
  }, [activeUserId]);

  return (
    <>
      <Container>
        {' '}
        <Title main="전체 사용자 카드 관리" sub="사용자 카드정보를 관리해보세요." />
        <DataCount>총 {totalElements.toLocaleString()}명의 유저</DataCount>
        {/** 사용자 정보 테이블 */}
        {data.length == 0 ? (
          <EmptyContent>
            <LuSearchX size={40} color={theme.color.main} />
            <div className="empty-title">사용자 리스트가 없습니다.</div>
            <div className="empty-subTitle">사용자가 곧 추가될 예정입니다.</div>
          </EmptyContent>
        ) : (
          <>
            {/** 유저의 추가정보 */}
            {activeUserId !== '' && (
              <UserInfoBox
                userData={userData}
                activeUserId={activeUserId}
                onDeleteClick={() => setIsOpen(true)}
              />
            )}
            {/** 유저리스트 */}
            <div className="table">
              <Table
                columns={userCardColumns}
                data={data}
                rowKey="userCode"
                renderCell={(key, value) => {
                  if (key === 'createdAt') return dayjs(value).format('YYYY-MM-DD'); // 발급일
                  if (key === 'cardNumber') return value.match(/.{1,4}/g).join('-'); // 카드번호
                  if (key === 'currentBenefit') {
                    // 최신혜택
                    return <WrapCell>{value}</WrapCell>;
                  }
                  if (key === 'status') {
                    let color, bgColor, title;
                    if (value === 'active') {
                      color = `${theme.color.main}`;
                      bgColor = '#E8F3FF';
                      title = '활동유저';
                    } else {
                      color = `${theme.color.red}`;
                      bgColor = '#FFE8E8';
                      title = '삭제유저';
                    }
                    return (
                      <StatusBadge color={color || '#959595'} bgColor={bgColor || '#E8E8E8'}>
                        {title}
                      </StatusBadge>
                    );
                  }
                  return value;
                }}
                onRowClick={(row) => setActiveUserId(row.userCode)}
              />
            </div>
          </>
        )}
        {/** 페이징 컴포넌트*/}
        <Pagination
          page={page}
          size={SIZE}
          totalElements={totalElements}
          onPageChange={handlePageChange}
        />
      </Container>
      {isOpen && (
        <Modal
          icon={<BsQuestionCircle size={32} color={theme.color.red} />}
          buttons={[
            {
              text: '취소',
              onClick: () => setIsOpen(false),
              bgColor: 'white',
              textColor: '#7C7F86',
              border: '1px solid #7C7F86',
            },
            {
              text: '삭제하기',
              onClick: () => setIsOpen(false), // 삭제 API
              bgColor: `${theme.color.red}`,
              textColor: 'white',
            },
          ]}
        >
          {userData?.userName} 유저를 삭제하겠습니까?
        </Modal>
      )}
    </>
  );
};

export default AdminCardPage;

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
