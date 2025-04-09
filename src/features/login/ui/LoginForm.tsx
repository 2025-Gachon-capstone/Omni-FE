import { Input } from '../../../shared/ui';
import styled from '@emotion/styled';

interface LoginFormProps {
  data: {
    id: string;
    password: string;
  };
  handleData: (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ data, handleData }) => {
  return (
    <InputBox>
      <Input width="100%" value={data.id} placeholder="아이디" onChange={handleData('id')} />
      <Input
        width="100%"
        value={data.password}
        placeholder="비밀번호"
        type="password"
        onChange={handleData('password')}
      />
    </InputBox>
  );
};

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
