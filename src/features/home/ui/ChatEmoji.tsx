import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';

export const ChatEmoji = () => {
  return (
    <ChatBody>
      <ChatTail />
    </ChatBody>
  );
};

const ChatBody = styled.div`
  position: relative;
  height: 2rem;
  width: 3rem;
  margin-left: -1rem;
  margin-bottom: 1rem;
  background-color: ${theme.color.main};
  border-radius: 0.5rem;
`;
const ChatTail = styled.div`
  height: 1rem;
  position: absolute;
  bottom: -25px;
  left: 10px;
  border-left: 10px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid ${theme.color.main};
`;
