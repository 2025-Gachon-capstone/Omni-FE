import styled from '@emotion/styled';
import useDevice from './../shared/hooks/useDevice';
import { Title } from '../shared/ui';
import { Outlet } from 'react-router-dom';
import theme from '../shared/styles/theme';

const UserMyPage = () => {
  const { isMobile } = useDevice();
  return (
    <Container>
      <MyPageContainer isMobile={isMobile}>
        <div className="title">
          <Title
            main="마이페이지"
            sub={
              location.pathname !== '/mypage/edit'
                ? '유저의 정보를 확인해보세요.'
                : '정보를 수정해보세요.'
            }
          />
        </div>
        <Circle />
        {/** MyPage View/Edit 분기 */}
        <Outlet />
      </MyPageContainer>
    </Container>
  );
};

export default UserMyPage;

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const MyPageContainer = styled.div<{ isMobile: boolean }>`
  width: 90%;
  max-width: 60rem;
  padding: ${(props) => (props.isMobile ? '1rem 0 1rem 1rem' : '4rem 0 4rem 4rem')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  .title {
    margin-right: auto;
  }
`;

const Circle = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin: 0 auto;
  background-color: ${theme.color.main};
`;
