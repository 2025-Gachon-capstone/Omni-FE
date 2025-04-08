import styled from '@emotion/styled';
import useDevice from '../../hooks/useDevice';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export const RouterButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const { isMobile } = useDevice();
  return (
    <BtnBox isMobile={isMobile} onClick={onClick}>
      {text}&nbsp;
      <IoArrowForwardCircleOutline size={`${isMobile ? '0.8rem' : '1.5rem'}`} />
    </BtnBox>
  );
};

const BtnBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => (props.isMobile ? '0.8rem' : '1.5rem')};
  color: white;
  border: 1px solid white;
  border-radius: ${(props) => (props.isMobile ? '0.5rem' : '1rem')};
  padding: ${(props) => (props.isMobile ? '0.25rem 0.5rem' : '0.5rem 1rem')};
  cursor: pointer;
`;
