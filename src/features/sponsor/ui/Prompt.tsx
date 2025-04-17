import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { useHeaderStore } from '../../../shared/store';

import { AiFillSmile } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';

export type MessageType = 'ai' | 'user';

interface MessageItem {
  type: MessageType;
  text: string;
}

interface PromptProps {
  messages: MessageItem[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

export const Prompt = ({ messages, input, onInputChange, onKeyDown, onSend }: PromptProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const headerHeight = useHeaderStore((state) => state.headerHeight);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      const maxHeight = window.innerHeight * 0.3; // 30vh

      inputRef.current.style.height = 'auto';

      const newHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = newHeight > maxHeight ? `${maxHeight}px` : `${newHeight}px`;
    }
  }, [input]);

  return (
    <Container headerHeight={headerHeight}>
      <ChatBox ref={chatRef}>
        {messages.map((msg, idx) => (
          <MessageWrapper key={idx} type={msg.type}>
            {msg.type === 'ai' && <Avatar />}
            <MessageBubble type={msg.type}>{msg.text}</MessageBubble>
          </MessageWrapper>
        ))}
      </ChatBox>

      <BottomWrapper>
        <Benefit />
        <InputWrapper>
          <ChatInput
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder="작성중인 혜택에 대해 질문해보세요"
            rows={1}
          />
          <SendButton onClick={onSend}>
            <BsArrowUpSquareFill size={20} />
          </SendButton>
        </InputWrapper>
      </BottomWrapper>
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

const MessageWrapper = styled.div<{ type: 'user' | 'ai' }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  gap: 0.5rem;
`;

const Avatar = styled(AiFillSmile)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${theme.color.white}; // 파란 배경
  color: ${theme.color.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageBubble = styled.div<{ type: 'user' | 'ai' }>`
  align-self: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.type === 'user' ? theme.color.main : theme.color.white)};
  color: ${(props) => (props.type === 'user' ? theme.color.white : theme.color.black)};
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  max-width: 70%;
  font-size: 0.875rem;
  border: ${(props) => (props.type === 'ai' ? `1px solid ${theme.color.bold_border}` : 'none')};
  white-space: pre-wrap; // ✅ 줄바꿈 적용!
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Benefit = styled(BsPencilSquare)`
  color: ${theme.color.main};
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  align-self: flex-end; // 우측 하단으로 보내고
  margin-top: auto; // 위 요소가 커져도 자기 위치 유지
  margin-bottom: 0.75rem;
  margin-right: 1rem;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 0.75rem;
  align-items: center; // ⬅️ 버튼이 항상 하단에 고정됨
  border: 1px solid ${theme.color.bold_border};
  background-color: ${theme.color.white};
  max-height: 30vh; // 👉 화면의 30%까지만 늘어나게 제한
  border-radius: 0.5rem;
  overflow-y: visible;
`;

const ChatInput = styled.textarea`
  flex: 1;
  padding: 0 1rem;
  font-size: 1rem;
  height: 2rem;
  outline: none;
  border: none;
  max-height: 100%;
  overflow-y: auto;
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
  flex-shrink: 0;
  align-self: flex-end; // 우측 하단으로 보내고
  margin-top: auto; // 위 요소가 커져도 자기 위치 유지
`;
