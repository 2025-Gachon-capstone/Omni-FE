import styled from '@emotion/styled';
import { FaCheckSquare } from 'react-icons/fa';
import { SelectedUserResDto } from '../type/UserCard';
import { Button, Input } from '../../../../shared/ui';
import useDevice from '../../../../shared/hooks/useDevice';
import theme from './../../../../shared/styles/theme';
import { toast } from 'react-toastify';

interface Props {
  userData?: SelectedUserResDto;
  onDeleteClick: () => void;
}

const UserInfoBox = ({ userData, onDeleteClick }: Props) => {
  const { isMobile } = useDevice();
  return (
    <RequestBox isMobile={isMobile}>
      <div className="info">
        <div>
          <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{userData?.memberName}</span>{' '}
          유저정보
        </div>
        <Button
          color={theme.color.red}
          width="7rem"
          onClick={() =>
            userData?.memberId ? onDeleteClick() : toast.error('이미 삭제된 유저입니다.')
          }
        >
          유저 삭제
        </Button>
      </div>
      <div className="info">
        <div className="simple-info">
          <AvailableBenefit>
            <div className="available-benefit-title">
              <FaCheckSquare color={theme.color.main} size={20} />
              현재 사용가능혜택 확인하기
            </div>
            <div className="available-benefit-list">
              {userData?.benefits && userData.benefits.length > 0 ? (
                userData.benefits.map((row, idx) => <span key={idx}>{row.title}</span>)
              ) : (
                <span>사용 가능한 혜택이 없습니다.</span>
              )}
            </div>
          </AvailableBenefit>
        </div>
        <div className="simple-info">
          <InfoRow>
            <span>발급일자</span>
            <Input value={userData?.createdAt} styleType="outline" disabled />
          </InfoRow>
          <InfoRow>
            <span>카드번호</span>
            <Input
              value={
                userData?.cardNumber ? (userData.cardNumber.match(/.{1,4}/g)?.join('-') ?? '') : ''
              }
              styleType="outline"
              disabled
            />
          </InfoRow>
          <InfoRow>
            <span>발급인</span>
            <Input value={userData?.memberName || ''} styleType="outline" disabled />
          </InfoRow>
        </div>
      </div>
    </RequestBox>
  );
};

export default UserInfoBox;

const RequestBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem 2rem;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  gap: 1.25rem;

  .info {
    display: flex;
    flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
    justify-content: space-between;
    gap: 2rem;

    .simple-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 30rem;
    }
  }
`;

const AvailableBenefit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .available-benefit-title {
    display: flex;
    gap: 0.5rem;
  }

  .available-benefit-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border-radius: 4px;
    border: 1px solid ${theme.color.main};
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 10rem;

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${theme.color.main};
      border-radius: 8px;
    }
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
  font-size: 1.25rem;
  color: #595959;
`;
