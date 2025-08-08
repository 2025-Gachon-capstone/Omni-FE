import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';

export const CustomRatioSection = () => {
  return (
    <Wrapper>
      {/** 비율 값 컨테이너 */}
      <RatiosWrapper>
        {/** (첫 구매) 비율 */}
        <RatioBox>
          <Name>첫 구매</Name>
          <ValueBox>
            <Value type="number" />%
          </ValueBox>
        </RatioBox>
        {/** (재구매) 비율 */}
        <RatioBox>
          <Name>재구매</Name>
          <ValueBox>
            <Value type="number" />%
          </ValueBox>
        </RatioBox>
      </RatiosWrapper>
      {/** 비율 슬라이더 */}
      <RatioSlider type="range" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 20rem;
  padding: 5rem 6rem 8rem 6rem;
  box-sizing: border-box;
  border-radius: 8px;
  background: white;
  box-shadow:
    4px 4px 12px 0 rgba(213, 212, 212, 0.2),
    -4px -4px 12px 0 rgba(213, 212, 212, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RatiosWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RatioBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const ValueBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #bebfc3;
`;

const Value = styled.input`
  all: unset;
  max-width: 5rem;
  text-align: center;
  font-size: 2rem;
  color: #080b1d;
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RatioSlider = styled.input`
  all: unset;
  background-color: #e2e6e9;
  width: 100%;
  max-width: 70rem;
  height: 4px;
  margin: 0 auto;
  cursor: pointer;
  &:active {
    cursor: grabbing;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${theme.color.main};
  }
`;
