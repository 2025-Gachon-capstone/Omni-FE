import { useState } from 'react';
import styled from '@emotion/styled';
import useDevice from '../shared/hooks/useDevice';
import { Title } from '../shared/ui';
import Card from '../shared/assets/img/card.svg';
import { PasswordAuth } from '../features/user/myCard/ui/PasswordAuth';
import { MyCardInfo } from '../features/user/myCard/ui/MyCardInfo';

const UserMyCard = () => {
  const { isMobile } = useDevice();
  const [cardPassword, setCardPassword] = useState(''); // 카드비밀번호
  const [isMine, setIsMine] = useState(-1); // 카드비밀번호 (-1: 초기, 0: 인증실패, 1: 인증성공)

  return (
    <Container>
      <MyCardContainer isMobile={isMobile}>
        <div className="title">
          <Title main="MY카드" sub="내 카드 정보를 확인해보세요." />
        </div>
        <ImgBox>
          <img src={Card} width={180} />
        </ImgBox>
        {/** 비밀번호 불일치 >> PasswordAuth
         *   비밀번호 일치   >> MyCardInfo
         */}
        {isMine !== 1 ? (
          <PasswordAuth
            cardPassword={cardPassword}
            isMine={isMine}
            handleCardPassword={(e) => {
              setCardPassword(e.target.value);
              setIsMine(-1);
            }}
            handleIsMine={setIsMine}
          />
        ) : (
          <MyCardInfo />
        )}
      </MyCardContainer>
    </Container>
  );
};

export default UserMyCard;

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const MyCardContainer = styled.div<{ isMobile: boolean }>`
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

const ImgBox = styled.div`
  margin: 0 auto;
`;
