import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { StepGuide } from './StepGuide';
import { CustomTabList } from '../model/CustomTabList';
import theme from '../../../../shared/styles/theme';
import { CustomMarketing } from './CustomMarketing';
import { BenefitCustomizer } from './BenefitCustomizer';
import { Button } from '../../../../shared/ui';
import { useCustomBenefit } from '../model/useCustomBenefit';
import { toast } from 'react-toastify';
import { BsCheckCircle } from 'react-icons/bs';
import Modal from '../../../../shared/ui/Modal';

export const CustomBenefit = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { customState, clearState } = useCustomBenefit((state) => state); // 혜택 데이터
  const [isOpen, setIsOpen] = useState(false); // 모달

  const [selectedTab, setSelectedTab] =
    useState<(typeof CustomTabList)[number]['key']>('REORDERED'); // 선택 탭

  /** --------- 유효성 검증로직 --------- */
  const checkValidateValue = () => {
    if (!customState.title) {
      toast.error('협찬명을 입력해주세요.');
      return;
    } else if (customState.discount_rate > 100 || customState.discount_rate < 0) {
      toast.error('0~100%의 할인율을 입력해주세요.');
      return;
    } else if (customState.amount <= 0) {
      toast.error('협찬수량을 입력해주세요.');
      return;
    }
    setIsOpen(true);
  };

  /** ------ (수정) 혜택 발행 API ------- */
  const onSubmitBenefit = () => {
    // API 혜택 발행 (customState.excludeProductIdList 가공필요.)
    console.log(customState);
    console.log(customState.excludeProductIdList.map((product) => product.productId));

    const isSuccess = true;
    // 성공 => 화면이동
    if (isSuccess) {
      const query = new URLSearchParams({
        productId: params.get('productId') ?? '',
        name: params.get('name') ?? '',
        step: '1',
      });
      navigate(`/sponsor/report?${query}`);
      clearState();
    }
    // 실패
    // (공통)
    setIsOpen(false);
  };

  return (
    <>
      <ContentWrapper>
        {/** 혜택 발행 단계 가이드 */}
        <HeaderWrapper>
          <StepGuide />
        </HeaderWrapper>
        {/** 맞춤 마케팅 컴포넌트*/}
        <Title>맞춤 마케팅</Title>
        {/** 탭 */}
        <Tabs>
          {CustomTabList.map((tab) => (
            <Tab
              key={tab.key}
              selected={selectedTab == tab.key}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </Tab>
          ))}
        </Tabs>
        {/** 탭 컨텐츠 (재구매, 관련제품)*/}
        <TabsContent>
          <CustomMarketing selected={selectedTab} />
        </TabsContent>
        {/** 혜택 조정 */}
        <BenefitCustomizer />
        <Button width="10rem" padding="1rem 1.5rem" onClick={checkValidateValue}>
          혜택 발행
        </Button>
      </ContentWrapper>
      {isOpen && (
        <Modal
          icon={<BsCheckCircle size={32} color={theme.color.main} />}
          buttons={[
            {
              text: '취소',
              onClick: () => setIsOpen(false),
              bgColor: 'white',
              textColor: '#7C7F86',
              border: '1px solid #7C7F86',
            },
            {
              text: '발행하기',
              onClick: () => onSubmitBenefit(),
              bgColor: `${theme.color.main}`,
              textColor: 'white',
            },
          ]}
        >
          신규혜택을 발행할까요?
        </Modal>
      )}
    </>
  );
};

const ContentWrapper = styled.div`
  padding: 7rem 4.8rem 5rem 4.8rem;

  button {
    float: right;
    margin: 2rem 0 4rem 0;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Tab = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 1rem 0;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  background-color: ${({ selected }) => (selected ? `${theme.color.main}` : 'transperant')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const TabsContent = styled.div`
  padding: 2rem 1.5rem;
`;
