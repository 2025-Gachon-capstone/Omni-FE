import styled from '@emotion/styled';
import { Input, Title } from '../../../../shared/ui';
import theme from '../../../../shared/styles/theme';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import useDevice from '../../../../shared/hooks/useDevice';
import { useCardInfo } from '../api/useCardInfo';
import Loading from '../../../../pages/Loading';

interface PasswordAuthProps {
  cardPassword: string;
  isMine: number;
  handleCardPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIsMine: (value: number) => void;
}

export const PasswordAuth: React.FC<PasswordAuthProps> = ({
  cardPassword,
  isMine,
  handleCardPassword,
  handleIsMine,
}) => {
  const { isMobile } = useDevice();
  const { verifyCard, loading } = useCardInfo();

  // 카드 비밀번호 확인 API
  const checkPassword = async () => {
    if (isNaN(Number(cardPassword)) || cardPassword.length !== 4) {
      toast.error('비밀번호를 정확히 입력해주세요.');
    } else {
      const { isSuccess, message } = await verifyCard(cardPassword);
      if (isSuccess) {
        // 인증 성공
        handleIsMine(1);
        toast.success(message);
      } else {
        // 인증 실패
        handleIsMine(0);
        toast.error(message);
      }
    }
  };

  // 엔터 이벤트 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Form isMobile={isMobile}>
      <Title
        main="비밀번호 인증"
        sub="정보확인을 위해 회원가입 시 입력한 비밀번호 4자리를 입력해주세요."
      />
      <div className="password-input">
        <Input
          value={cardPassword}
          onChange={handleCardPassword}
          onKeyDown={handleKeyDown}
          styleType="outline"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          width={isMobile ? '15rem' : '30rem'}
          maxLength={4}
        />
        <BsArrowRightCircleFill color={theme.color.main} size={40} onClick={checkPassword} />
      </div>
      {isMine == 0 && <div className="error-phrase">비밀번호가 일치하지 않습니다.</div>}
    </Form>
  );
};

const Form = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  .password-input {
    display: flex;
    align-items: center;
    gap: ${(props) => (props.isMobile ? '1.2rem' : '3rem')};
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
