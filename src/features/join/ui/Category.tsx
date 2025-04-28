import styled from '@emotion/styled';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useGetCategory } from '../api/useGetCategory';
import Loading from '../../../pages/Loading';

export const Category = ({
  category,
  setBCategory,
}: {
  category: string;
  setBCategory: (category: string, categoryId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴 오픈
  const { categories, loading } = useGetCategory(); // 카테고리 데이터 가져오기

  return loading ? (
    <Loading />
  ) : (
    <SelectBox onClick={() => setIsOpen((prev) => !prev)}>
      <label style={{ color: `${category == '' ? '#999999' : 'black'}` }}>
        {category || '회사 카테고리'}
      </label>
      {!isOpen ? (
        <IoIosArrowDown size={20} color="#999999" />
      ) : (
        <IoIosArrowUp size={20} color="#999999" />
      )}
      <SelectOptions visible={isOpen}>
        {categories.map((option) => (
          <Option
            onClick={(e) => {
              e.stopPropagation();
              setBCategory(option.title, option.categoryId);
              setIsOpen(false);
            }}
            key={option.categoryId}
            className={option.title === category ? 'selected' : ''}
          >
            {option.title}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 21.438rem;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  border-bottom: 1px solid #999999;

  font-size: 1.25rem;
  cursor: pointer;

  & > svg {
    position: absolute;
    right: 0.625rem;
  }
`;

const SelectOptions = styled.ul<{ visible: boolean }>`
  z-index: 1;
  list-style: none;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 3rem;
  width: 100%;
  max-height: 11.5rem;
  padding: 0;
  margin: 1rem 0 0 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: white;
  border-width: 0.5px 1px 1px 1px;
  border-style: solid;
  border-color: #d9d9d9;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Option = styled.li`
  font-size: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;

  color: #999999;
  background-color: white;
  border-bottom: 0.5px solid #d9d9d9;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #eeeeee;
  }
  &.selected {
    background-color: #eeeeee;
  }
`;
