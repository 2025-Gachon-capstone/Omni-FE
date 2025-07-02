import styled from '@emotion/styled';
import useDevice from '../../../../shared/hooks/useDevice';

export const InfoInput = ({ label, value }: { label: string; value: string | number }) => {
  const { isMobile } = useDevice();
  return (
    <InfoBox isMobile={isMobile}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </InfoBox>
  );
};

const InfoBox = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;

  .label {
    flex-grow: 0.8;
    flex-basis: 1rem;
    flex-shrink: 0;
    color: #595959;
    font-size: ${(props) => (props.isMobile ? '0.75rem' : '1rem')};

    display: flex;
    align-items: center;

    &::after {
      content: '';
      height: 1.25rem;
      width: 0.1rem;
      background-color: #f0f0f0;
      display: inline-block;
      margin-left: 2rem;
    }
  }
  .value {
    flex-grow: 1;
    flex-basis: 3rem;
    flex-shrink: 0;
    justify-self: flex-start;
    margin-right: auto;
    color: #1d1d1f;
    white-space: nowrap;
  }
`;
