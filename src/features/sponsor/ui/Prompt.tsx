import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { useEffect, useRef } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { useHeaderStore } from '../../../shared/store';

export type MessageType = 'ai' | 'user';

interface MessageItem {
  type: MessageType;
  text: string;
}

interface PromptProps {
  messages: MessageItem[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Prompt = ({ messages, input, onInputChange, onSend, onEnter }: PromptProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const headerHeight = useHeaderStore((state) => state.headerHeight);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container headerHeight={headerHeight}>
      <ChatBox ref={chatRef}>
        {messages.map((msg, idx) => (
          <Message key={idx} type={msg.type}>
            {msg.text}
          </Message>
        ))}
      </ChatBox>
      <InputWrapper>
        <ChatInput
          value={input}
          onChange={onInputChange}
          onKeyDown={onEnter}
          placeholder="작성중인 혜택에 대해 질문해보세요"
        />
        <SendButton onClick={onSend}>
          <BsArrowUpSquareFill size={20} />
        </SendButton>
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div<{ headerHeight: number }>`
  box-sizing: border-box;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  background-color: ${theme.color.white};
  position: relative;
`;

const ChatBox = styled.div`
  background-color: ${theme.color.white};
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Message = styled.div<{ type: 'user' | 'ai' }>`
  align-self: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.type === 'user' ? theme.color.main : theme.color.white)};
  color: ${(props) => (props.type === 'user' ? theme.color.white : theme.color.black)};
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  max-width: 70%;
  font-size: 0.875rem;
  border: ${(props) => (props.type === 'ai' ? `1px solid ${theme.color.bold_border}` : 'none')};
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0.75rem;
  align-items: center;
  border: 1px solid ${theme.color.bold_border};
  background-color: ${theme.color.white};
  border-radius: 0.5rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
  border: none;
`;

const SendButton = styled(BsArrowUpSquareFill)`
  margin-left: 0.5rem;
  padding: 0 1rem;
  color: ${theme.color.main};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  width: 2rem;
  height: 2rem;
`;
