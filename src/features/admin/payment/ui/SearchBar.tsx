import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { Keyword } from '../type/Keyword';
import { BsSearch } from 'react-icons/bs';
import useDevice from '../../../../shared/hooks/useDevice';

interface SearchBarProps {
  keyword: Keyword;
  setKeyword: React.Dispatch<React.SetStateAction<Keyword>>;
  handleSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ keyword, setKeyword, handleSearch }) => {
  const { isMobile } = useDevice();
  return (
    <Container isMobile={isMobile}>
      {/** 날짜 선택 */}
      <div className="date-picker">
        <Name>내역 검색</Name>
        <Pickers isMobile={isMobile}>
          <DatePicker
            locale={ko}
            shouldCloseOnSelect
            selected={keyword.startDate}
            onChange={(date) => setKeyword((prev) => ({ ...prev, startDate: date }))}
            dateFormat="yyyy-MM-dd"
            placeholderText="검색 시작일"
            maxDate={keyword.endDate || undefined}
          />
          <SeperateBar />
          <DatePicker
            locale={ko}
            shouldCloseOnSelect
            selected={keyword.endDate}
            onChange={(date) => setKeyword((prev) => ({ ...prev, endDate: date }))}
            dateFormat="yyyy-MM-dd"
            placeholderText="검색 마지막일"
            minDate={keyword.startDate || undefined}
          />
        </Pickers>
      </div>
      {/** 유저아이디 입력 */}
      <div className="user-id">
        <Input
          value={keyword.loginId}
          onChange={(e) => setKeyword((prev) => ({ ...prev, loginId: e.target.value }))}
          placeholder="유저아이디를 검색해주세요."
        />
        <BsSearch size={20} color="#bcbcbc" onClick={handleSearch} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '90%' : '100%')};
  padding: 1.25rem 1rem;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  border-radius: 0.25rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .date-picker {
    display: flex;
    flex-wrap: ${(props) => (props.isMobile ? 'wrap' : 'nowrap')};
    gap: ${(props) => (props.isMobile ? '1.5rem' : '3.5rem')};
  }
  .user-id {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    svg {
      cursor: pointer;
    }
  }
`;

const Name = styled.div`
  color: #595959;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const Pickers = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  .react-datepicker__input-container > input {
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    width: ${(props) => (props.isMobile ? '5rem' : '8rem')};
  }
`;

const SeperateBar = styled.div`
  width: 12px;
  height: 1px;
  background-color: black;
`;

const Input = styled.input`
  max-width: 16rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  &::placeholder {
    color: #999999;
  }
`;
