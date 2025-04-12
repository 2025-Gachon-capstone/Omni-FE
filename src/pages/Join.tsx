import styled from '@emotion/styled';
import { useState } from 'react';
import useDevice from '../shared/hooks/useDevice';
import { Button } from '../shared/ui';
import { BsCheckCircle } from 'react-icons/bs';
import { ToggleButton } from '../features/join/ui/ToggleButton';
import { LoginPhrase } from '../features/join/ui/LoginPhrase';
import { JoinUserForm } from '../features/join/ui/JoinUserForm';
import { JoinSponsorForm } from '../features/join/ui/JoinSponsorForm';
import { UserFormData, SponsorFormData } from '../features/join/type/FormDataType';
import { validateFormData } from '../features/join/model/validateFormData';
import Modal from '../shared/ui/Modal';
import theme from '../shared/styles/theme';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Join = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // 모달창 오픈 여부
  const [isSponsor, setIsSponsor] = useState(false); // 회원가입 타입
  // 일반유저 데이터
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: '',
    id: '',
    password: '',
    passwordCheck: '',
    cardPassword: '',
  });
  // 협찬사 데이터
  const [sponsorFormData, setSponsorFormData] = useState<SponsorFormData>({
    name: '',
    id: '',
    password: '',
    passwordCheck: '',
    bNumber: '',
    bName: '',
    bCategory: '',
    isValid: false,
  });

  // 초기화 함수
  const resetData = () => {
    setUserFormData((prev) => ({
      ...prev,
      name: '',
      id: '',
      password: '',
      passwordCheck: '',
      cardPassword: '',
    }));
    setSponsorFormData((prev) => ({
      ...prev,
      name: '',
      id: '',
      password: '',
      passwordCheck: '',
      bNumber: '',
      bName: '',
      bCategory: '',
      isValid: false,
    }));
  };

  const handleLogin = () => {
    const data = isSponsor ? sponsorFormData : userFormData;
    console.log('회원가입 데이터:', data);
    // 유효성 검사
    if (validateFormData(isSponsor, userFormData, sponsorFormData)) {
      setIsOpen(true);
    } else {
      toast.error('모든 항목을 정확히 입력해주세요');
    }
  };

  return (
    <>
      <Container>
        <JoinContainer isMobile={isMobile}>
          <Title>회원가입</Title>
          <ToggleButton
            caption="사업자 여부"
            isSponsor={isSponsor}
            toggleHandler={() => {
              resetData();
              setIsSponsor((prev) => !prev);
            }}
          />
          {!isSponsor ? (
            <JoinUserForm formData={userFormData} setFormData={setUserFormData} />
          ) : (
            <JoinSponsorForm formData={sponsorFormData} setFormData={setSponsorFormData} />
          )}
          <Button
            width="100%"
            onClick={handleLogin}
            disabled={!validateFormData(isSponsor, userFormData, sponsorFormData)}
          >
            회원가입
          </Button>
          <LoginPhrase />
        </JoinContainer>
      </Container>
      {isOpen && (
        <Modal
          icon={<BsCheckCircle size={32} color={theme.color.main} />}
          buttons={[
            {
              text: '취소',
              onClick: () => navigate('/', { replace: true }),
              bgColor: 'white',
              textColor: '#7C7F86',
              border: '1px solid #7C7F86',
            },
            {
              text: '로그인하기',
              onClick: () => navigate('/login', { replace: true }),
              bgColor: `${theme.color.main}`,
              textColor: 'white',
            },
          ]}
        >
          회원가입이 완료되었습니다.
          <br />
          로그인하러 가시겠습니까?
        </Modal>
      )}
    </>
  );
};

export default Join;

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinContainer = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '90%' : '100%')};
  max-width: 22.5rem;
  margin-top: ${(props) => (props.isMobile ? '1.25rem' : '-1rem')};
  margin-bottom: 5rem;
  padding: 1rem 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
