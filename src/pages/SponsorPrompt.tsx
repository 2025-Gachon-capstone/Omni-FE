import { useEffect, useState } from 'react';
import { Prompt, MessageType } from '../features/sponsor/prompt/ui/Prompt';
import { BenefitPopover } from '../features/sponsor/prompt/ui/BenefitPopover';
import { BenefitFormData } from '../features/sponsor/prompt/type/FormDataType';
import { BenefitList } from '../features/sponsor/prompt/ui/BenefitList';
import styled from '@emotion/styled';
import { BenefitResponseDTO } from '../features/sponsor/prompt/type/ResponseDTO';
import {
  convertBenefitResToReq,
  convertBenefitResToForm,
} from '../features/sponsor/prompt/type/converter';
import { postBenefit } from '../features/sponsor/prompt/api/postBenefit';
import { useAuthStore } from '../shared/store';
import { useBenefitList } from '../features/sponsor/prompt/api/useBenefitList';
import Loading from './Loading';
import { patchBenefit } from '../features/sponsor/prompt/api/patchBenefit';
import { DeleteModal, SubmitModal } from '../features/sponsor/prompt/ui/Modals';
import { deleteBenefit } from '../features/sponsor/prompt/api/deleteBenefit';
import { toast } from 'react-toastify';

interface Message {
  type: MessageType;
  text: string;
}

type ModalType = 'submit' | 'delete' | null;

const SponsorPrompt = () => {
  const sponsorId = useAuthStore((state) => state.user?.sponsorId);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: '안녕하세요! 협찬 관련해서 어떤 걸 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const [benefitList, setBenefitList] = useState<BenefitResponseDTO[]>([]);
  const { getBenefitList, isLoading } = useBenefitList();
  const [activeBenefitId, setActiveBenefitId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      if (sponsorId === undefined) {
        console.error('Sponsor ID is undefined');
        return;
      }

      const list = await getBenefitList({ sponsorId });
      if (list.length === 0) {
        console.log('혜택내역이 없습니다. 신규 혜택이 생성됩니다.');
        await handleAddBenefit();
      } else {
        console.log('혜택내역이 있습니다. 처음 혜택이 활성화됩니다.');
        setBenefitList(list);
        setActiveBenefitId(list[0]?.benefitId ?? null); // 첫 번째 혜택 선택
      }
    };

    fetchBenefits();
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

  const handleBenefitDataChange = (field: keyof BenefitFormData, value: string | Date) => {
    if (activeBenefitId === null) return;

    setBenefitList((prev) => {
      const index = prev.findIndex((b) => b.benefitId === activeBenefitId);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddBenefit = async () => {
    if (sponsorId === undefined) {
      console.error('Sponsor ID is undefined');
      return;
    }

    const benefitId = await postBenefit(sponsorId);

    if (benefitId === undefined) {
      console.error('benefit ID is undefined');
      return;
    }

    const newBenefit: BenefitResponseDTO = {
      benefitId,
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      discounRate: 0,
      targetProduct: '',
      amount: 0,
      targetMember: '',
      status: 'PENDING',
    };

    setBenefitList((prev) => [newBenefit, ...prev]);
    setActiveBenefitId(benefitId); // 새로 만든 항목 선택 상태로
  };

  const handleReqBtn = async () => {
    if (activeBenefitId === null) return;
    // 삭제 API
    if (modalType === 'delete') {
      if (benefitList.length < 2) {
        toast.error(`혜택을 삭제하실 수 없습니다.`);
        return;
      }

      await deleteBenefit(activeBenefitId);
      setBenefitList((prev) => prev.filter((benefit) => benefit.benefitId !== activeBenefitId));
      setActiveBenefitId(benefitList[0].benefitId);
      setModalType(null);

      return;
    }
    if (activeBenefit === undefined) return;
    // 임시저장, 제출 API
    const today = new Date().setHours(0, 0, 0, 0);
    const startDay = activeBenefit.startDate.setHours(0, 0, 0, 0);
    const endDay = activeBenefit.endDate.setHours(0, 0, 0, 0);
    if (startDay < today) {
      toast.error(`시작일이 오늘보다 빠릅니다`);
      return;
    } else if (endDay < today) {
      toast.error(`종료일이 오늘보다 빠릅니다`);
      return;
    } else if (startDay >= endDay) {
      toast.error('시작일이 종료일보다 늦거나 같습니다');
      return;
    }

    if (modalType === 'submit') {
      if (startDay > today) activeBenefit.status = 'BEFORE';
      else activeBenefit.status = 'ONGOING';
    }
    console.log(`로그 출력`);
    const request = convertBenefitResToReq(activeBenefit);
    console.log(`request: ${request}`);

    await patchBenefit(activeBenefitId, request);

    setModalType(null);
  };

  return isLoading && activeBenefitId ? (
    <Loading />
  ) : (
    <Layout>
      <BenefitList
        chatRooms={benefitList}
        activeBenefitId={activeBenefitId}
        onSelect={(id: number) => {
          console.log('✅ 선택된 혜택 ID:', id); // ✅ 여기!
          setActiveBenefitId(id);
          setIsPopoverOpen(false); // 👉 혜택 변경 시 팝오버 닫기
        }}
        onAdd={handleAddBenefit} // ✅ 신규 혜택 추가
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
            (console.log('🧩 팝오버에 전달될 데이터:', convertBenefitResToForm(activeBenefit)),
            (
              <BenefitPopover
                status={activeBenefit.status}
                data={convertBenefitResToForm(activeBenefit)}
                handleData={handleBenefitDataChange}
                setModalType={setModalType}
                onClickSave={handleReqBtn}
                ModalSlot={
                  modalType === 'submit' ? (
                    <SubmitModal onCancel={() => setModalType(null)} onConfirm={handleReqBtn} />
                  ) : modalType === 'delete' ? (
                    <DeleteModal onCancel={() => setModalType(null)} onConfirm={handleReqBtn} />
                  ) : null
                }
              />
            ))
          }
        />
      </PromptWrapper>
    </Layout>
  );
};

export default SponsorPrompt;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative; // ✅ 기준점 만들기
`;

const PromptWrapper = styled.div`
  grid-column: 2; // ✅ 오른쪽 그리드 칸에만 표시
`;
