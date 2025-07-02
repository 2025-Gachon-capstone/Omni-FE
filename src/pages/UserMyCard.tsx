import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import useDevice from '../shared/hooks/useDevice';
import { Button, Title } from '../shared/ui';
import Modal from '../shared/ui/Modal';
import theme from '../shared/styles/theme';
import { toast } from 'react-toastify';

const UserMyCard = () => {
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(false); // 카드추가 모달창
  const [cardPassword, setCardPassword] = useState(''); // 카드비밀번호
  const [isCardPasswordValid, setIsCardPasswordValid] = useState(-1); // 카드 비밀번호 형식 (-1: 초기, 0: 형식X, 1: 형식O)

  // 모달창 컨텐츠 초기화
  const resetContent = () => {
    setCardPassword('');
    setIsCardPasswordValid(-1);
    setIsOpen(false);
  };

  /** ------------- 카드 생성하기 API --------------- */
  const createCard = useCallback(() => {
    if (/^\d{4}$/.test(cardPassword)) {
      setIsCardPasswordValid(1);
    } else {
      setIsCardPasswordValid(0);
    }

    if (isCardPasswordValid) {
      // 카드 생성 API
      // 성공, 실패
      let result = 1;
      if (result) {
        toast.success('카드가 성공적으로 추가되었습니다.');
      } else {
        toast.error('카드 추가에 실패했습니다.');
      }
    }
  }, [cardPassword, isCardPasswordValid]);

  return (
    <>
      <Container>
        <MyCardContainer isMobile={isMobile}>
          <div className="title">
            <Title main="MY카드" sub="내 카드 정보를 확인하고 새로운 카드를 추가하세요." />
          </div>
          <div className="new-button">
            <Button width="8.5rem" textSize="1rem" onClick={() => setIsOpen(true)}>
              카드 추가하기
            </Button>
          </div>
          <div className="content"></div>
        </MyCardContainer>
      </Container>
      {isOpen && (
        <Modal
          buttons={[
            {
              text: '취소하기',
              onClick: () => resetContent(),
              bgColor: 'white',
              textColor: '#7C7F86',
              border: '1px solid #7C7F86',
            },
            {
              text: '추가하기',
              onClick: () => {
                createCard();
                resetContent();
              },
              bgColor: theme.color.main,
              textColor: 'white',
            },
          ]}
        >
          <ModalContent>
            <div>새 카드의 비밀번호를 입력해주세요.</div>
            <input
              placeholder="숫자 4자리"
              type="password"
              maxLength={4}
              value={cardPassword}
              onChange={(e) => setCardPassword(e.target.value)}
            />
            {isCardPasswordValid == 0 && (
              <div className="error-phrase">비밀번호 형식에 맞게 입력해주세요.</div>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default UserMyCard;

const Container = styled.div`
  max-width: 100vw;
  min-height: 80vh;
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
  .new-button {
    align-self: flex-end;
  }
`;

const ModalContent = styled.div`
  margin-top: -1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input {
    outline: none;
    border: none;
    width: 16rem;
    padding: 0.5rem 0.75rem;
    background-color: #f4f4f4;
    border-radius: 0.25rem;
  }

  .error-phrase {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${theme.color.red};

    align-self: flex-start;
    margin: -0.5rem 0 0 0.5rem;
  }
`;
