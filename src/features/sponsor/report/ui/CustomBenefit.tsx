import { useState } from 'react';
import styled from '@emotion/styled';
import { StepGuide } from './StepGuide';
import { CustomTabList } from '../model/CustomTabList';
import theme from '../../../../shared/styles/theme';
import { CustomMarketing } from './CustomMarketing';

export const CustomBenefit = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof CustomTabList)[number]['key']>('REORDERED');

  return (
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
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  padding: 7rem 4.8rem 5rem 4.8rem;
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
