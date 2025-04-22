import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDevice from '../../../../shared/hooks/useDevice';

interface Category {
  id: number;
  name: string;
}

export const CategoryList = () => {
  const { isMobile } = useDevice();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const departmentId = Number(searchParams.get('departmentId') ?? '0');

  useEffect(() => {
    const fetchedCategories = [
      { id: 1, name: '전자제품' },
      { id: 2, name: '식품' },
      { id: 3, name: '디저트' },
      { id: 4, name: '패션' },
      { id: 5, name: '뷰티' },
      { id: 6, name: '도서' },
      { id: 7, name: '생활' },
      { id: 8, name: '기타' },
    ];

    setCategories([{ id: 0, name: '전체보기' }, ...fetchedCategories]);
  }, []);
  return (
    <CategoryContainer isMobile={isMobile}>
      {categories.map((cat) => (
        <CategoryButton
          key={cat.id}
          onClick={() => {
            setSearchParams({ departmentId: String(cat.id), page: '1' });
          }}
          selected={cat.id === departmentId}
          isMobile={isMobile}
        >
          {cat.name}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div<{ isMobile: ConstrainBoolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMobile ? 'center' : 'flex-start')};
  flex-wrap: ${(props) => (props.isMobile ? 'wrap' : 'nowrap')};
  margin: ${(props) => (props.isMobile ? '2rem auto' : '0 auto 2rem auto')};
  max-width: 75rem;
  overflow-x: auto;
  white-space: nowrap;
  gap: 10px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dbdbdb;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button<{ selected: boolean; isMobile: boolean }>`
  background: ${({ selected }) => (selected ? '#DBDBDB' : 'white')};
  color: black;
  min-width: ${(props) => (props.isMobile ? '5rem' : '8.5rem')};
  padding: ${(props) => (props.isMobile ? '0.8rem 0.5rem' : '1rem 0.5rem')};
  border-radius: 10px;
  border: none;
  font-size: ${(props) => (props.isMobile ? '0.8rem' : '0.9rem')};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  :hover {
    opacity: 0.8;
  }
`;
