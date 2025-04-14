import { useState } from 'react';
import { Prompt, MessageType } from '../features/sponsor/ui/Prompt';

interface Message {
  type: MessageType;
  text: string;
}

const Sponsor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: '안녕하세요! 협찬 관련해서 어떤 걸 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');

    // TODO: 실제 AI 응답 로직 연결
  };

  return (
    <Prompt
      messages={messages}
      input={input}
      onInputChange={(e) => setInput(e.target.value)}
      onEnter={(e) => e.key === 'Enter' && handleSend()}
      onSend={handleSend}
    />
  );
};

export default Sponsor;
