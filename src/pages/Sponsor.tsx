import { useState } from 'react';
import { Prompt, MessageType } from '../features/sponsor/ui/Prompt';
import { BenefitPopover } from '../features/sponsor/ui/BenefitPopover';
import { BenefitFormData } from '../features/sponsor/type/FormDataType';

interface Message {
  type: MessageType;
  text: string;
}

const Sponsor = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: '안녕하세요! 협찬 관련해서 어떤 걸 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const [benefitData, setBenefitData] = useState<BenefitFormData>({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    discounRate: 0,
    targetProduct: '',
    amount: 0,
    targetMember: '',
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setInput('');
    console.log('📨 handleSend 실행됨:', input);
    // TODO: 실제 AI 응답 로직 연결
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault(); // 줄바꿈 방지
      handleSend();
    }
  };

  const handleBenefitDataChange =
    (field: keyof BenefitFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBenefitData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleDateChange = (field: keyof BenefitFormData) => (date: Date | null) => {
    if (date) {
      setBenefitData((prev) => ({
        ...prev,
        [field]: date,
      }));
    }
  };

  return (
    <Prompt
      messages={messages}
      input={input}
      onInputChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      onSend={handleSend}
      onTogglePopover={() => setIsPopoverOpen((prev) => !prev)}
      BenefitPopoverSlot={
        isPopoverOpen && (
          <BenefitPopover
            data={benefitData}
            handleData={handleBenefitDataChange}
            handleDate={handleDateChange}
          />
        )
      }
    />
  );
};

export default Sponsor;
