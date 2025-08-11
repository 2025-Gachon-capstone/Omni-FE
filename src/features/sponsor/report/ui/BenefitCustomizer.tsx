import styled from '@emotion/styled';
import { FaPen } from 'react-icons/fa';
import theme from '../../../../shared/styles/theme';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import { useCustomBenefit } from '../model/useCustomBenefit';

export const BenefitCustomizer = () => {
  const { customState, setTitle, setDiscount, setAmount, setDate } = useCustomBenefit(
    (state) => state,
  );

  const handleInputChange = (field: 'title' | 'discount_rate' | 'amount', value: string) => {
    if (field === 'title') {
      setTitle(value.trimStart());
    } else {
      const number = Number(value);
      if (isNaN(number) || number < 0) return;
      if (field === 'discount_rate') {
        setDiscount(number);
      } else if (field === 'amount') {
        setAmount(number);
      }
    }
  };

  return (
    <Wrapper>
      <Title>
        <FaPen color={theme.color.main} /> 혜택 조정
      </Title>
      <Bar />
      <InputWrapper>
        {/** 협찬명 */}
        <Field>
          <Label>협찬명</Label>
          <Input
            maxLength={20}
            value={customState.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </Field>
        {/** 할인율 */}
        <Field>
          <Label>할인율(%)</Label>
          <Input
            type="number"
            value={customState.discount_rate}
            onChange={(e) => handleInputChange('discount_rate', e.target.value)}
          />
        </Field>
        {/** 혜택 수량 */}
        <Field>
          <Label>수량(개)</Label>
          <Input
            type="number"
            value={customState.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
          />
        </Field>
        {/** 협찬기간 */}
        <Field>
          <Label>협찬기간</Label>
          <Pickers>
            <DatePicker
              locale={ko}
              shouldCloseOnSelect
              selected={customState.startDate}
              onChange={(date) => setDate('start', date!)}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작일"
              maxDate={customState.endDate || undefined}
            />
            <SeperateBar />
            <DatePicker
              locale={ko}
              shouldCloseOnSelect
              selected={customState.endDate}
              onChange={(date) => setDate('end', date!)}
              dateFormat="yyyy-MM-dd"
              placeholderText="마지막일"
              minDate={customState.startDate || undefined}
            />
          </Pickers>
        </Field>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 20rem;
  padding: 2.5rem 4rem;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  background: white;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Bar = styled.div`
  margin: 1.3rem 0;
  width: 100%;
  height: 1px;
  background-color: #dbdbdb;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.div`
  font-size: 1rem;
  color: #595959;
`;
const Input = styled.input`
  all: unset;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 1rem 0.5rem;
`;

const Pickers = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .react-datepicker__input-container > input {
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 1rem 0.5rem;
    width: 12rem;
  }
`;

const SeperateBar = styled.div`
  width: 12px;
  height: 1px;
  background-color: #dbdbdb;
`;
