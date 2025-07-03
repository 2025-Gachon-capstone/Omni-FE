import styled from '@emotion/styled';
import { Input } from '../../../../shared/ui';
import theme from '../../../../shared/styles/theme';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import useDevice from '../../../../shared/hooks/useDevice';
import { useState } from 'react';

export const PasswordAuth = ({ handleValid }: { handleValid: (value: number) => void }) => {
  const { isMobile } = useDevice();
  const [cardPassword, setCardPassword] = useState('');
  const [errorPhrase, setErrorPhrase] = useState('');

  // 카드 비밀번호 확인 API
  const checkPassword = async () => {
    if (!/^\d{4}$/.test(cardPassword)) {
      setErrorPhrase('비밀번호 형식에 맞지 않습니다.');
      handleValid(0);
    } else {
      if (1) {
        // 인증 성공
        setErrorPhrase('');
        handleValid(1);
      } else {
        // 인증 실패
        setErrorPhrase('비밀번호가 일치하지 않습니다.');
        handleValid(0);
      }
    }
  };

  // 입력 비밀번호 이벤트 변경 함수
  const handleCardPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardPassword(e.target.value);
  };
  // 엔터 이벤트 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  };

  return (
    <Form isMobile={isMobile}>
      <div className="title">카드 비밀번호 입력</div>
      <SeparateBar />
      <div className="password-input">
        <Input
          value={cardPassword}
          onChange={handleCardPassword}
          onKeyDown={handleKeyDown}
          styleType="outline"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          width={isMobile ? '15rem' : '18rem'}
          maxLength={4}
        />
        <BsArrowRightCircleFill color={theme.color.main} size={36} onClick={checkPassword} />
      </div>
      {errorPhrase && <div className="error-phrase">{errorPhrase}</div>}
    </Form>
  );
};

const Form = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1d1d1f;
  }
  .password-input {
    display: flex;
    align-items: center;
    gap: ${(props) => (props.isMobile ? '1.2rem' : '2.5rem')};
    svg {
      cursor: pointer;
    }
  }
  .error-phrase {
    margin-top: -1.25rem;
    color: ${theme.color.red};
    font-size: 0.8rem;
  }
`;

const SeparateBar = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background-color: #f0f0f0;
`;
