import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { BsPlusSquareFill } from 'react-icons/bs';
import { BenefitResponseDTO } from '../type/ResponseDTO';
import { FiLock, FiUnlock } from 'react-icons/fi';

interface BenefitListProps {
  chatRooms: BenefitResponseDTO[];
  activeBenefitId: number | null;
  onSelect: (id: number) => void;
}

export const BenefitList = ({ chatRooms, activeBenefitId, onSelect }: BenefitListProps) => {

  return (
    <Sidebar>
      <Header>
        <Title>협찬 내역</Title>
        <AddButton>
          <BsPlusSquareFill size={20} />
        </AddButton>
      </Header>

      <List>
        {chatRooms.map((room) => (
          <ListItem
            key={room.benefitId}
            isActive={room.benefitId === activeBenefitId}
            onClick={() => onSelect(room.benefitId)}
          >
            {room.title}
            {room.status === 'COMPLETED' ? <FiLock size={16} /> : <FiUnlock size={16} />}
          </ListItem>
        ))}
      </List>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  box-sizing: border-box;
  background-color: ${theme.color.main_blue};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const AddButton = styled.button`
  background: transparent;
  size: 1.5rem 1.5rem;
  border: none;
  color: ${theme.color.main};
  cursor: pointer;
  svg {
    color: ${theme.color.main}; // 아이콘 자체 색상
    background-color: ${theme.color.white}; // 배경색
    border-radius: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;

    &:hover {
      color: ${theme.color.white};
      background-color: ${theme.color.main}; // 배경색
    }
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
`;

const List = styled.ul`
  flex: 1;
  padding: 0 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.li<{ isActive: boolean }>`
  list-style: none; // ✅ 기본 점 제거
  padding: 0.5rem 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.375rem;
  background: ${({ isActive }) => (isActive ? theme.color.main_gray : 'transparent')};

  &:hover {
    background: ${theme.color.hint};
    border-radius: 0.375rem;
    color: ${theme.color.white};
  }
`;
