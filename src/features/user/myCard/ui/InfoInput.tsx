import styled from '@emotion/styled';
import { Input } from '../../../../shared/ui';
import useDevice from '../../../../shared/hooks/useDevice';

export const InfoInput = ({ label, value }: { label: string; value: string | number }) => {
  const { isMobile } = useDevice();
  return (
    <InfoBox isMobile={isMobile}>
      <div className="label">{label}</div>
      <Input styleType="outline" value={value} width={isMobile ? '15rem' : ''} disabled />
    </InfoBox>
  );
};

const InfoBox = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '80%')};
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMobile ? '1rem' : '2rem')};
  ${(props) => props.isMobile && ` justify-content:space-between`};
  margin-right: auto;
  .label {
    color: #595959;
    font-size: ${(props) => (props.isMobile ? '1rem' : '1.25rem')};
    white-space: nowrap;
    margin-right: auto;
  }
`;
