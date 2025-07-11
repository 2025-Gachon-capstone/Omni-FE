import { useEffect, useState } from 'react';
import { Prompt } from '../features/sponsor/prompt/ui/Prompt';
import { BenefitPopover } from '../features/sponsor/prompt/ui/BenefitPopover';
import { BenefitFormData } from '../features/sponsor/prompt/type/FormDataType';
import { BenefitList } from '../features/sponsor/prompt/ui/BenefitList';
import styled from '@emotion/styled';
import {
  BenefitResponseDTO,
  MessageDTO,
  MessageResponseDTO,
} from '../features/sponsor/prompt/type/ResponseDTO';
import {
  convertBenefitResToReq,
  convertBenefitResToForm,
} from '../features/sponsor/prompt/type/converter';
import { useAuthStore } from '../shared/store';
import { useBenefitList } from '../features/sponsor/prompt/api/useBenefitList';
import Loading from './Loading';
import { DeleteModal, SubmitModal } from '../features/sponsor/prompt/ui/Modals';
import { toast } from 'react-toastify';
import { useMessageList } from '../features/sponsor/prompt/api/useMessageList';

type ModalType = 'submit' | 'delete' | null;

const initialMessage: MessageDTO = {
  chatMessageId: -1,
  authorType: 'AI', // 이미 "AI" | "USER" 타입에 포함됨
  content: '안녕하세요! 협찬 관련해서 어떤 걸 도와드릴까요?',
};

const SponsorPrompt = () => {
  const sponsorId = useAuthStore((state) => state.user?.sponsorId);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [throttle, setThrottle] = useState(false);
  const [messageSlice, setMessageSlice] = useState<MessageResponseDTO>({
    messages: [initialMessage],
    hasNext: false,
    hasPrev: false,
    currentPage: 1,
  });

  const [input, setInput] = useState('');
  const [benefitList, setBenefitList] = useState<BenefitResponseDTO[]>([]);
  const { getBenefitList, postBenefit, patchBenefit, submitBenefit, deleteBenefit, isLoading } =
    useBenefitList();
  const [activeBenefitId, setActiveBenefitId] = useState<number | null>(null);
  const { getMessageList, postMessage, isMessageLoading } = useMessageList();

  useEffect(() => {
    const fetchBenefits = async () => {
      if (sponsorId === undefined) {
        console.error('Sponsor ID is undefined');
        return;
      }

      const list = await getBenefitList({ sponsorId });

      if (list === undefined || list.length === 0) {
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

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeBenefitId === null) {
        console.error('benefit ID is undefined');
        return;
      }

      setMessageSlice({
        messages: [initialMessage],
        hasNext: false,
        hasPrev: false,
        currentPage: 1,
      });

      const slice = await getMessageList({ benefitId: activeBenefitId, size: 15 });

      if (slice === undefined) {
        console.error('채팅 내역 조회 실패');
        return;
      }

      if (slice.messages.length !== 0) {
        setMessageSlice(slice);
      }
    };

    fetchMessages();
  }, [activeBenefitId]);

  const activeBenefit = benefitList.find((b) => b.benefitId === activeBenefitId);

  const handleSend = () => {
    if (input === undefined || !input.trim()) {
      console.log('input이 undefined 혹은 비어있습니다.');
      toast.error('비어있는 채팅은 보낼 수 없습니다.');
      return;
    }

    if (throttle || activeBenefitId == null) return;
    else if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        const newMessage: MessageDTO = {
          chatMessageId: null,
          authorType: 'USER',
          content: input,
        };

        console.log('📨 handleSend 실행됨:', input);
        if (activeBenefit === undefined) {
          toast.error('협찬 내용(상품/고객 등)을 채워주세요.');
          return;
        }

        const resMessage = await postMessage(activeBenefitId, activeBenefit, newMessage, setInput);
        if (resMessage === undefined) return;

        setMessageSlice((prevResponse) => ({
          ...prevResponse, // 이전 상태 복사 (messages, hasNext, hasPrev)
          messages: [resMessage, newMessage, ...prevResponse.messages], // 기존 메시지 배열에 새 메시지 추가
        }));
        setThrottle(false);
      }, 300);
    }
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
      discountRate: 1,
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
    var success: boolean;
    // 삭제 API
    if (modalType === 'delete') {
      if (benefitList.length < 2) {
        toast.error(`혜택을 삭제하실 수 없습니다.`);
        return;
      }

      success = await deleteBenefit(activeBenefitId);
      if (!success) return;

      setBenefitList((prev) => {
        const newBenefitList = prev.filter((benefit) => benefit.benefitId !== activeBenefitId);
        setActiveBenefitId(newBenefitList[0].benefitId);
        return newBenefitList;
      });

      setIsPopoverOpen(false);
      setModalType(null);

      return;
    }
    if (activeBenefit === undefined) return;

    // 필수 필드 체크

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

    const request = convertBenefitResToReq(activeBenefit);

    if (modalType === 'submit') {
      if (
        !activeBenefit.title ||
        !activeBenefit.title.trim() ||
        activeBenefit.discountRate === 0 ||
        !activeBenefit.targetProduct ||
        !activeBenefit.targetProduct.trim() ||
        activeBenefit.amount <= 0 ||
        !activeBenefit.targetMember ||
        !activeBenefit.targetMember.trim()
      ) {
        toast.error('모든 필드를 정확히 입력해주세요');
        return;
      }

      if (startDay > today) request.status = 'BEFORE';
      else request.status = 'ONGOING';

      console.log(`request: ${request}`);
      success = await submitBenefit(activeBenefitId, request);

      if (!success) return;

      setBenefitList((prev) =>
        prev.map((benefit) =>
          benefit.benefitId === activeBenefitId ? { ...benefit, status: request.status } : benefit,
        ),
      );
    } else {
      console.log(`request: ${request}`);
      success = await patchBenefit(activeBenefitId, request);
      if (!success) return;
    }

    setModalType(null);
  };

  const handleLoadNext = async () => {
    if (!messageSlice.hasNext || activeBenefitId === null) return;

    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        console.log('이전 채팅 불러오는 중...');

        const prevSlice = await getMessageList({
          benefitId: activeBenefitId,
          page: messageSlice.currentPage + 1,
          size: 15,
        });

        if (prevSlice) {
          setMessageSlice((prev) => ({
            messages: [...prev.messages, ...prevSlice.messages], // 기존 메시지 뒤에 추가
            hasNext: prevSlice.hasNext,
            hasPrev: prevSlice.hasPrev,
            currentPage: prevSlice.currentPage,
          }));
        }
        setThrottle(false);
      }, 300);
    }
  };

  return (
    <>
      {(isLoading || isMessageLoading) && <Loading />}
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
            messages={messageSlice.messages}
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onSend={handleSend}
            onTogglePopover={() => setIsPopoverOpen((prev) => !prev)}
            onLoadNext={handleLoadNext}
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
    </>
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
