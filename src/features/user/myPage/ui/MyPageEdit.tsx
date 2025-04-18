import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import useDevice from '../../../../shared/hooks/useDevice';
import { Button, Input } from '../../../../shared/ui';
import { toast } from 'react-toastify';

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();

  const [password, setPassword] = useState({
    current: '', // 현재 비밀번호
    new: '', // 새로운 비밀번호
    confirm: '', // 새로운 비밀번호 확인
  });
  const [isCorrect, setIsCorrect] = useState(-1); // 비밀번호 상태 (-1: 초기, 0: 실패, 1: 성공)

  const handleChange =
    (field: keyof typeof password) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // 현재 비밀번호 일치 여부
  const checkCurrentPassword = () => {
    const result = true; // (임시) API 결과 대체
    setIsCorrect(result ? 1 : 0);
  };

  // 비밀번호 수정
  const modifyPassword = () => {
    // 비밀번호 수정 API 호출
    if (password.new !== password.confirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
    } else {
      // 수정 API
      toast.success('비밀번호가 정상수정되었습니다.');
      navigate('..', { replace: true });
    }
  };

  return (
    <Container>
      {/* 현재 비밀번호 */}
      <InputRow isMobile={isMobile}>
        <div className="label">현재 비밀번호</div>
        <div className="input-wrapper">
          <Input
            type="password"
            value={password.current}
            onChange={handleChange('current')}
            styleType="outline"
            width={isMobile ? '15rem' : '21.25rem'}
          />
          <div style={{ marginLeft: '0.75rem' }}>
            <Button onClick={checkCurrentPassword} width="5rem" padding="1.25rem">
              확인
            </Button>
          </div>
        </div>
      </InputRow>

      {/* 비밀번호 확인 결과 */}
      <CaptionBox isMobile={isMobile}>
        {isCorrect === 1 && <Caption color={theme.color.main}>비밀번호가 일치합니다.</Caption>}
        {isCorrect === 0 && (
          <Caption color={theme.color.red}>비밀번호가 일치하지 않습니다.</Caption>
        )}
      </CaptionBox>

      {isCorrect === 1 && (
        <>
          {/* 새로운 비밀번호 입력 영역 */}
          <InputRow isMobile={isMobile}>
            <div className="label">새로운 비밀번호</div>
            <div className="input-wrapper">
              <Input
                type="password"
                value={password.new}
                onChange={handleChange('new')}
                styleType="outline"
                width={isMobile ? '20.25rem' : '21rem'}
              />
            </div>
          </InputRow>

          <InputRow isMobile={isMobile}>
            <div className="label">비밀번호 확인</div>
            <div className="input-wrapper">
              <Input
                type="password"
                value={password.confirm}
                onChange={handleChange('confirm')}
                styleType="outline"
                width={isMobile ? '20.25rem' : '21rem'}
              />
            </div>
          </InputRow>
          {/* 수정 완료 버튼 */}
          <ButtonWrapper>
            <Button onClick={modifyPassword} width={isMobile ? '93%' : '100%'}>
              수정 완료
            </Button>
          </ButtonWrapper>
        </>
      )}
    </Container>
  );
};

export default MyPageEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 38rem;
  margin-top: 2rem;
  gap: 2rem;
`;

const InputRow = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  ${(props) => !props.isMobile && `align-items: center`};
  gap: 1.25rem;

  .label {
    width: 10rem;
    color: #595959;
    font-size: 1.25rem;
    white-space: nowrap;
    ${(props) => !props.isMobile && `text-align: right`};
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

const CaptionBox = styled.div<{ isMobile: boolean }>`
  width: 100%;
  margin-left: ${(props) => (props.isMobile ? '1rem' : '22rem')};
  margin-top: -1rem;
`;

const Caption = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 0.9rem;
`;

const ButtonWrapper = styled.div`
  margin: 3rem auto 0 auto;
  width: 90vw;
  max-width: 24rem;
`;
