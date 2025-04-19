import { useEffect, useState } from 'react';
import { Prompt, MessageType } from '../features/sponsor/ui/Prompt';
import { BenefitPopover } from '../features/sponsor/ui/BenefitPopover';
import { BenefitFormData } from '../features/sponsor/type/FormDataType';
import { BenefitList } from '../features/sponsor/ui/BenefitList';
import styled from '@emotion/styled';
import { BenefitResponseDTO } from '../features/sponsor/type/ResponseDTO';
import { benefitResponseDTOToFormData } from '../features/sponsor/type/converter';

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
  const [benefitList, setBenefitList] = useState<BenefitResponseDTO[]>([]);
  const [activeBenefitId, setActiveBenefitId] = useState<number | null>(null);

  useEffect(() => {
    setBenefitList([
      {
        benefitId: 1,
        title: '신규회원 쿠폰',
        startDate: new Date(),
        endDate: new Date(),
        discounRate: 10,
        targetProduct: '초코 우유',
        amount: 100,
        targetMember: '신규가입자',
        status: 'PENDING',
      },
      {
        benefitId: 2,
        title: 'VIP 전용 혜택',
        startDate: new Date(),
        endDate: new Date(),
        discounRate: 20,
        targetProduct: '바나나 우유',
        amount: 50,
        targetMember: 'VIP 등급 회원',
        status: 'COMPLETED',
      },
    ]);

    setActiveBenefitId(1); // 기본으로 첫 번째 혜택 선택
  }, []);
  const activeBenefit = benefitList.find((b) => b.benefitId === activeBenefitId);

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
      const value = e.target.value;
      if (activeBenefitId === null) return;

      setBenefitList((prev) =>
        prev.map((benefit) =>
          benefit.benefitId === activeBenefitId ? { ...benefit, [field]: value } : benefit,
        ),
      );
    };

  const handleDateChange = (field: keyof BenefitFormData) => (date: Date | null) => {
    if (!date || activeBenefitId === null) return;

    setBenefitList((prev) =>
      prev.map((benefit) =>
        benefit.benefitId === activeBenefitId ? { ...benefit, [field]: date } : benefit,
      ),
    );
  };

  return (
    <Layout>
      <BenefitList
        chatRooms={benefitList}
        activeBenefitId={activeBenefitId}
        onSelect={(id: number) => {
          console.log('✅ 선택된 혜택 ID:', id); // ✅ 여기!
          setActiveBenefitId(id);
          setIsPopoverOpen(false); // 👉 혜택 변경 시 팝오버 닫기
        }}
      />
      <PromptWrapper>
        <Prompt
          messages={messages}
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          onTogglePopover={() => setIsPopoverOpen((prev) => !prev)}
          BenefitPopoverSlot={
            isPopoverOpen &&
            activeBenefit &&
            (console.log('🧩 팝오버에 전달될 데이터:', benefitResponseDTOToFormData(activeBenefit)),
            (
              <BenefitPopover
                status={activeBenefit.status}
                data={benefitResponseDTOToFormData(activeBenefit)}
                handleData={handleBenefitDataChange}
                handleDate={handleDateChange}
              />
            ))
          }
        />
      </PromptWrapper>
    </Layout>
  );
};

export default Sponsor;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative; // ✅ 기준점 만들기
`;

const PromptWrapper = styled.div`
  grid-column: 2; // ✅ 오른쪽 그리드 칸에만 표시
`;
