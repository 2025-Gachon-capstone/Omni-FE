import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import useDevice from '../../../../shared/hooks/useDevice';
import { useGetGategory } from '../api/useGetCategory';
import Loading from '../../../../pages/Loading';
import { useLayoutEffect, useRef } from 'react';

export const CategoryList = () => {
  const { isMobile } = useDevice();
  const { loading, data } = useGetGategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const departmentId = Number(searchParams.get('departmentId') ?? 0);

  /** 특정 카테고리 위치 이동 */
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const handleClick = (id: number) => {
    setSearchParams({ departmentId: String(id), page: '1' });
  };

  useLayoutEffect(() => {
    if (!departmentId || !data) return;

    const button = buttonRefs.current[departmentId];
    const container = containerRef.current;

    if (button && container) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = buttonRect.left - containerRect.left;

      container.scrollBy({
        left: offset,
      });
    }
  }, [data, departmentId]);

  return loading ? (
    <Loading />
  ) : (
    <CategoryContainer ref={containerRef} isMobile={isMobile}>
      {data.map((cat) => (
        <CategoryButton
          key={cat.productCategoryId}
          ref={(el) => {
            buttonRefs.current[cat.productCategoryId] = el;
          }}
          onClick={() => handleClick(cat.productCategoryId)}
          selected={cat.productCategoryId === departmentId}
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
