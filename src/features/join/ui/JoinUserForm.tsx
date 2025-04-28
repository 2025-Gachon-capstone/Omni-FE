import styled from '@emotion/styled';
import { Input } from '../../../shared/ui';
import { UserFormData } from '../type/FormDataType';

export const JoinUserForm = ({
  formData,
  setFormData,
}: {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
}) => {
  const handleData = (type: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [type]: e.target.value }));
  };

  return (
    <Container>
      <Input placeholder="이름" value={formData.name} onChange={handleData('name')} />
      <Input placeholder="아이디" value={formData.loginId} onChange={handleData('loginId')} />
      <Input
        type="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleData('password')}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={formData.eqPassword}
        onChange={handleData('eqPassword')}
      />
      <Input
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="카드 비밀번호 (숫자 4자리)"
        maxLength={4}
        value={formData.cardPassword}
        onChange={handleData('cardPassword')}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;
