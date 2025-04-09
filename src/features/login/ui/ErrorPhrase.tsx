import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';

export const ErrorPhrase = () => {
  return <Text>아이디 혹은 비밀번호가 일치하지 않습니다.</Text>;
};

const Text = styled.div`
  color: ${theme.color.red};
  font-size: 0.75rem;
  margin-left: 0.25rem;
  margin-right: auto;
`;
