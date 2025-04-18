import { useState } from 'react';
import styled from '@emotion/styled';
import useDevice from '../../../../shared/hooks/useDevice';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/ui';
import { BsQuestionCircle } from 'react-icons/bs';
import theme from '../../../../shared/styles/theme';
import Modal from '../../../../shared/ui/Modal';

const MyPageView = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // 모달창 오픈 여부

  return (
    <>
      <Container>
        <div className="info">
          <InfoBox isMobile={isMobile}>
            <div className="label">아이디</div>
            <Input
              value="id입니다"
              styleType="outline"
              width={isMobile ? '15rem' : '27.5rem'}
              disabled
            />
          </InfoBox>
          <EditButton onClick={() => navigate('edit')}>비밀번호 변경하기 →</EditButton>
        </div>
        <div className="withdraw">
          <div className="withdraw-caption">더 이상 Omni 카드를 이용하지 않는다면?</div>
          <div className="withdraw-btn" onClick={() => setIsOpen(true)}>
            회원탈퇴
          </div>
        </div>
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
              text: '탈퇴하기',
              onClick: () =>
                // 탈퇴API 및 토큰 삭제, 이동 (추후 추가)
                navigate('/', { replace: true }),
              bgColor: `${theme.color.red}`,
              textColor: 'white',
            },
          ]}
        >
          정말 탈퇴하시겠어요?
          <br />
          탈퇴 버튼 클릭 시, 계정은 삭제되며 복구되지 않습니다.
        </Modal>
      )}
    </>
  );
};

export default MyPageView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 27rem;
  gap: 7rem;
  padding-right: 1.25rem;

  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .withdraw {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1.25rem;
    border-top: 1px solid #bcbcbc;
    font-size: 0.75rem;
    .withdraw-caption {
      color: #595959;
      margin-left: 0.75rem;
    }
    .withdraw-btn {
      color: ${theme.color.red};
      cursor: pointer;
      margin-right: 0.75rem;
    }
  }
`;

const InfoBox = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMobile ? '1rem' : '2rem')};
  margin: 3rem auto 1rem auto;
  .label {
    color: #595959;
    font-size: ${(props) => (props.isMobile ? '1rem' : '1.25rem')};
    white-space: nowrap;
    margin-right: auto;
  }
`;

const EditButton = styled.div`
  color: ${theme.color.main};
  margin-left: auto;
  cursor: pointer;
`;
