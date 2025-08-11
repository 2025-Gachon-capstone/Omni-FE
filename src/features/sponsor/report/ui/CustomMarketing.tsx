import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { CustomRatioSection } from './CustomRatioSection';
import { CustomWordSection } from './CustomWordSection';

export const CustomMarketing = ({ selected }: { selected: string }) => {
  return (
    <Wrapper>
      {/** 콘텐츠 제목 */}
      <Title>
        {selected == 'REORDERED'
          ? '두 유형의 구매 비율을 설정해주세요.'
          : '당사 제품과 무관한 제품을 클릭하여 제외시켜주세요.'}
      </Title>
      {/** 콘텐츠 힌트 */}
      <Hint>
        <BsExclamationCircleFill color={theme.color.main} size={20} />
        {selected == 'REORDERED'
          ? '두 유형 중, 어떤 고객의 특성을 더 반영할지 선택하는 단계입니다. '
          : '당사의 제품과 무관하게 같이 구매되는 상품을 제외하여 마케팅 효과를 높여보세요.'}
      </Hint>
      {/** 콘텐츠 내용 */}
      {selected === 'REORDERED' ? <CustomRatioSection /> : <CustomWordSection />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`;
const Hint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.8rem;
  border: 2px solid ${theme.color.main};
  width: fit-content;
  padding: 0.8rem;
  color: ${theme.color.main};
  background-color: #e8f3ff;
`;
