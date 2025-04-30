// features/user/payment/ui/Pagination.tsx
import styled from '@emotion/styled';
import theme from '../styles/theme';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  page: number; // 페이지 번호
  size: number; // 한 페이지 당 요소개수
  totalElements: number; // 전체 요소 개수
  onPageChange: (newPage: number) => void;
}

const GROUP_SIZE = 5; // 페이지 그룹에 포함될 페이지개수 = 5개씩

const Pagination = ({ page, size, totalElements, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalElements / size); // 전체 페이지 개수
  const currentGroup = Math.floor((page - 1) / GROUP_SIZE); // 현재 페이지그룹 번호

  const startPage = currentGroup * GROUP_SIZE + 1; // 페이지그룹의 첫번째 페이지
  const endPage = Math.min(startPage + GROUP_SIZE - 1, totalPages); // 페이지그룹의 마지막 페이지

  // 페이지그룹에 포함된 페이지요소 배열
  const pageGroup = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  // 이전 페이지그룹 이동
  const handlePrevGroup = () => {
    const prevGroupLastPage = startPage - 1;
    if (prevGroupLastPage >= 1) {
      onPageChange(prevGroupLastPage);
    }
  };

  // 다음 페이지그룹 이동
  const handleNextGroup = () => {
    const nextGroupFirstPage = endPage + 1;
    if (nextGroupFirstPage <= totalPages) {
      onPageChange(nextGroupFirstPage);
    }
  };

  return (
    <PaginationWrapper>
      {startPage > 1 && <IoIosArrowBack color="#BCBCBC" size={24} onClick={handlePrevGroup} />}
      {pageGroup.map((pageNum) => (
        <PageButton key={pageNum} isActive={pageNum === page} onClick={() => onPageChange(pageNum)}>
          {pageNum}
        </PageButton>
      ))}

      {endPage < totalPages && (
        <IoIosArrowForward color="#BCBCBC" size={24} onClick={handleNextGroup} />
      )}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 4rem;
  margin-bottom: 5rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? `${theme.color.main}` : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : '#484848')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#1f4cd3' : '#e0e0e0')};
  }
`;
