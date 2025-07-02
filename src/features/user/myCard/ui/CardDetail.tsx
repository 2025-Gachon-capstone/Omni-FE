import styled from '@emotion/styled';
import { PasswordAuth } from './PasswordAuth';
import { useEffect, useState } from 'react';
import { MyCardInfo } from './MyCardInfo';

export const CardDetail = ({ selectedId }: { selectedId: number | null }) => {
  const [isValid, setIsValid] = useState(-1); // 카드 비밀번호 체크완료 (-1: 초기, 0: 실패, 1: 성공)

  useEffect(() => {
    setIsValid(-1);
  }, [selectedId]);

  return (
    <Container>
      {!selectedId ? (
        <NonSelected>카드를 선택해주세요.</NonSelected>
      ) : isValid == 1 ? (
        <MyCardInfo selectedId={selectedId} />
      ) : (
        <PasswordAuth handleValid={setIsValid} />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  flex-grow: 1;
  flex-basis: 18rem;
  flex-shrink: 0;
  height: 28rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 4px solid #f9f9f9;
  box-sizing: border-box;

  display: flex;
`;

const NonSelected = styled.div`
  margin: 0 auto;
  align-self: center;
  font-weight: 500;
  color: #cdcdcd;
`;
