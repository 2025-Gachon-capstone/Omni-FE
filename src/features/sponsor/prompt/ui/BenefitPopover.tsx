import theme from '../../../../shared/styles/theme';
import styled from '@emotion/styled';
import { BenefitFormData } from '../type/FormDataType';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { BenefitResponseDTO } from '../type/ResponseDTO';

interface BenefitPopoverProps {
  status: BenefitResponseDTO['status'];
  data: BenefitFormData;
  handleData: (field: keyof BenefitFormData, value: string | Date) => void;
  setModalType: (type: 'submit' | 'delete') => void; // ✅ 추가
  onClickSave?: () => void;
  ModalSlot?: React.ReactNode; // ✅ 추가
}

export const BenefitPopover: React.FC<BenefitPopoverProps> = ({
  status,
  data,
  handleData,
  setModalType,
  onClickSave,
  ModalSlot,
}) => {
  return (
    <Popover>
      <TitleRow>
        <TitleInput
          type="text"
          value={data.title}
          onChange={(e) => handleData('title', e.target.value)}
          placeholder="제공하려는 협찬명을 적어주세요."
        />
        {status === 'PENDING' ? (
          <IconButton status={status}>
            <FiTrash2 size={20} onClick={() => setModalType?.('delete')} />
          </IconButton>
        ) : (
          <IconButton status={status}>
            <FiCheckCircle size={20} />
          </IconButton>
        )}
      </TitleRow>
      <FormGrid>
        <Label>협찬 상품:</Label>
        <Input
          type="text"
          value={data.targetProduct}
          onChange={(e) => handleData('targetProduct', e.target.value)}
          style={{ textAlign: 'left' }}
        />

        <Label>협찬 기간:</Label>
        <InlineInputs>
          <StyledDatePickerWrapper>
            <DatePicker
              selected={data.startDate}
              onChange={(e) => handleData('startDate', e!)}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작일 선택"
              className="custom-datepicker"
            />
          </StyledDatePickerWrapper>
          <span style={{ color: 'white' }}>~</span>
          <StyledDatePickerWrapper>
            <DatePicker
              selected={data.endDate}
              onChange={(e) => handleData('endDate', e!)}
              dateFormat="yyyy-MM-dd"
              placeholderText="종료일 선택"
              className="custom-datepicker"
            />
          </StyledDatePickerWrapper>
        </InlineInputs>

        <Label>수량/할인율:</Label>
        <InlineInputs>
          <Input
            type="number"
            value={data.amount}
            onChange={(e) => handleData('amount', e.target.value)}
          />
          <span style={{ color: 'white' }}>개, </span>
          <Input
            type="number"
            value={data.discountRate}
            onChange={(e) => handleData('discountRate', e.target.value)}
          />
          <span style={{ color: 'white' }}>%</span>
        </InlineInputs>
      </FormGrid>
      <TextArea
        rows={6}
        value={data.targetMember}
        onChange={(e) => handleData('targetMember', e.target.value)}
        placeholder="AI와 대화하여 협찬 대상을 자세하게 적어주세요."
      />
      {status === 'PENDING' ? (
        <Actions>
          <Button type="button" status={status} onClick={onClickSave}>
            임시저장
          </Button>
          <SubmitButton type="submit" status={status} onClick={() => setModalType?.('submit')}>
            제출하기
          </SubmitButton>
        </Actions>
      ) : (
        <Actions>
          <Button type="button" status={status}>
            제출완료
          </Button>
        </Actions>
      )}
      {ModalSlot} {/* ✅ 여기서 children 렌더링 */}
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

const TitleInput = styled.input`
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

const IconButton = styled.button<{ status: BenefitResponseDTO['status'] }>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.color.white};
  padding: 0.25rem;

  cursor: ${({ status }) => (status !== 'PENDING' ? 'not-allowed' : 'pointer')};
  opacity: 1;
  pointer-events: ${({ status }) => (status !== 'PENDING' ? 'none' : 'auto')};

  ${({ status }) =>
    status === 'PENDING' &&
    `
    &:hover {
      opacity: 0.5;
    }
  `}

  svg {
    display: block;
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

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: ${theme.color.white};
  text-align: right;
`;

const InlineInputs = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap; // ✅ 넘치면 자동 줄바꿈
  gap: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.4rem 0.5rem;
  flex: 1; // ✨ 핵심: 공간 균등 분배
  min-width: 0; // ✨ flex: 1 쓸 때 넘침 방지
  max-width: 100%; // ✅ 부모 기준으로 넘지 않게 제한
  text-align: right; // 가운데 정렬

  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.color.white};
  outline: none;
  color: ${theme.color.white};
`;

const StyledDatePickerWrapper = styled.div`
  padding: 0.4rem 0.5rem;
  flex: 1;
  min-width: 0;
  max-width: 100%;

  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  color: white;

  input.custom-datepicker {
    background: transparent;
    border: none;
    border-bottom: none;
    outline: none;
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1rem;

    &::placeholder {
      color: ${theme.color.white};
    }
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${theme.color.bold_border};
  border-radius: 0.25rem;
  resize: vertical;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 1rem;
  font-size: 1rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ status: BenefitResponseDTO['status'] }>`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid ${theme.color.white};
  color: ${theme.color.white};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;

  ${({ status }) =>
    status === 'PENDING' &&
    `
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}

  cursor: ${({ status }) => (status !== 'PENDING' ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ status }) => (status !== 'PENDING' ? 'none' : 'auto')};
`;

const SubmitButton = styled(Button)`
  background: ${theme.color.white};
  color: ${theme.color.main};
  font-weight: 600;

  &:hover {
    background: ${theme.color.white};
  }
`;
