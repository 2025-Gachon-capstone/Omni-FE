import { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../shared/ui';
import { LoginForm } from '../features/login/ui/LoginForm';
import { ErrorPhrase } from '../features/login/ui/ErrorPhrase';
import { JoinPhrase } from '../features/login/ui/JoinPhrase';

const Login = () => {
  // 아이디, 비밀번호
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });
  const [isValidate, setIsValidate] = useState(-1); // (-1: 초기상태 , 0: 로그인 실패, 1: 로그인 성공)

  // [id, password] 로그인 값 핸들링 함수
  const handleData = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  // 로그인 API
  const handleLogin = () => {
    // 빈 값 체크
    if (loginData.id == '' || loginData.password == '') {
      alert('로그인 값을 입력해주세요.');
      return;
    }

    // (임시)
    if (true) {
      // 로그인 실패
      setIsValidate(0);
    } else {
      // 로그인 성공
      setIsValidate(1);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Title>로그인</Title>
        <LoginForm data={loginData} handleData={handleData} />
        {isValidate == 0 && <ErrorPhrase />}
        <Button width="100%" onClick={handleLogin}>
          로그인
        </Button>
        <JoinPhrase />
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 22.5rem;
  margin-top: -5.5rem;
  padding: 0 0.25rem;
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
