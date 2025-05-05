import React from 'react';
import styled from '@emotion/styled';

type TableProps<T> = {
  columns: ReadonlyArray<{ key: keyof T; header: string }>; // 테이블 헤더 컬럼
  data: T[]; // 테이블 데이터
  rowKey: keyof T;
  renderCell?: (key: keyof T, value: any) => React.ReactNode; // 데이터 변환 함수
  onRowClick?: (row: T) => void; // 행 클릭 이벤트
};

const Table = <T extends { [key: string]: any }>({
  columns,
  data,
  rowKey,
  renderCell,
  onRowClick,
}: TableProps<T>) => {
  return (
    <StyledTable>
      {/** 테이블 헤더 */}
      <thead>
        <tr>
          {columns.map((col) => (
            <Th key={String(col.key)}>{col.header}</Th>
          ))}
        </tr>
      </thead>
      {/** 테이블 바디 */}
      <tbody>
        {data.map((row) => (
          <tr
            key={String(row[rowKey])}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((col) => (
              <Td key={String(col.key)}>
                {renderCell ? renderCell(col.key, row[col.key]) : row[col.key]}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled.table`
  width: 100%;
  min-width: 45rem;
  max-width: 75rem;
  border-collapse: collapse;
  table-layout: auto;

  tbody > tr:hover {
    background-color: #f9f9f9;
  }
`;

const Th = styled.th`
  background-color: #efefef;
  border: none;
  padding: 1rem 0.5rem;

  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
`;

const Td = styled.td`
  border: none;
  padding: 2rem 0;
  font-size: 0.95rem;
  text-align: center;
`;
