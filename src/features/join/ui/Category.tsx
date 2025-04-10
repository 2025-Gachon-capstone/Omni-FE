import styled from '@emotion/styled';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { data } from '../model/SponsorCategoryData';

export const Category = ({
  bCategory,
  setBCategory,
}: {
  bCategory: string;
  setBCategory: (category: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴 오픈

  return (
    <SelectBox onClick={() => setIsOpen((prev) => !prev)}>
      <label style={{ color: `${bCategory == '' ? '#999999' : 'black'}` }}>
        {bCategory || '회사 카테고리'}
      </label>
      {!isOpen ? (
        <IoIosArrowDown size={20} color="#999999" />
      ) : (
        <IoIosArrowUp size={20} color="#999999" />
      )}
      <SelectOptions visible={isOpen}>
        {data.map((option) => (
          <Option
            onClick={(e) => {
              e.stopPropagation();
              setBCategory(option.name);
              setIsOpen(false);
            }}
            key={option.id}
            className={option.name === bCategory ? 'selected' : ''}
          >
            {option.name}
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
