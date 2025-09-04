import theme from '../../../../shared/styles/theme';
import styled from '@emotion/styled';
import { BenefitFormData } from '../type/FormDataType';
import 'react-datepicker/dist/react-datepicker.css';

interface BenefitPopoverProps {
  data: BenefitFormData;
  handleData: (field: keyof BenefitFormData, value: string | Date) => void;
}

export const BenefitPopover: React.FC<BenefitPopoverProps> = ({
  data,
}) => {
  return (
    <Popover>
      <TitleRow>
        <Title>{data.title}</Title>
      </TitleRow>
      <FormGrid>
        <Label>협찬 상품:</Label>
        <ValueText>{data.targetProduct || '-'}</ValueText>

        <Label>협찬 기간:</Label>
        <ValueText>
          {data.startDate.toLocaleDateString()} ~ {data.endDate.toLocaleDateString()}
        </ValueText>

        <Label>수량/할인율:</Label>
        <ValueText>
          {data.amount}개, {data.discountRate}%
        </ValueText>
    </FormGrid>
    </Popover>
  );
};

const Popover = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 1rem;
  background: ${theme.color.main};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 400px;
  box-sizing: border-box; // ✅ 추가!

  &::after {
    content: '';
    position: absolute;
    top: 100%; /* Popover 하단에 붙음 */
    left: 0.5rem; /* 원하는 위치 조정 */
    width: 0;
    height: 0rem;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid ${theme.color.main}; /* 위쪽 화살표 (배경색과 동일) */
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  width: 100%;
  max-width: 100%; // ✅ 부모 기준으로 넘지 않게 제한
  box-sizing: border-box; // ✅ 추가!

  background: transparent;
  border: none;
  outline: none;
  color: ${theme.color.white};

  &::placeholder {
    color: ${theme.color.white}; // 밝은 회색 계열 추천
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr; // 왼쪽 라벨, 오른쪽 인풋
  row-gap: 1.3rem;
  column-gap: 1rem;
  align-items: center; // 수직 정렬 맞추기
  margin-bottom: 1rem;
`;

const ValueText = styled.div`
  font-size: 1rem;
  color: ${theme.color.white};
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid ${theme.color.white};
  min-height: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: ${theme.color.white};
  text-align: right;
`;