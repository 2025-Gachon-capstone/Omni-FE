import styled from '@emotion/styled';
import theme from '../../../../shared/styles/theme';
import { BenefitResponseDTO } from '../type/ResponseDTO';

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
      </Header>

      <List>
        {chatRooms.map((room) => (
          <ListItem
            key={room.benefitId}
            isActive={room.benefitId === activeBenefitId}
            onClick={() => onSelect(room.benefitId)}
          >
            {room.title}
            <StatusDot status={room.status} />
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
  overflow-y: auto; /* ✅ 세로 스크롤 추가 */
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

const StatusDot = styled.span<{ status: BenefitResponseDTO['status'] }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case 'BEFORE':
        return '#9CA3AF'; // 회색
      case 'ONGOING':
        return '#22C55E'; // 초록
      case 'EXPIRED':
        return '#EF4444'; // 빨강
      default:
        return '#9CA3AF'; // fallback
    }
  }};
`;
