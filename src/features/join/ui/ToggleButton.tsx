import styled from '@emotion/styled';
import theme from '../../../shared/styles/theme';
import { ToggleProps } from '../type/ToggleProps';

export const ToggleButton = ({ caption, isSponsor, toggleHandler }: ToggleProps) => {
  return (
    <Container>
      <Caption>{caption}</Caption>
      <ToggleContainer isSponsor={isSponsor} onClick={toggleHandler}>
        <div className="toggle-circle" />
      </ToggleContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

const Caption = styled.div`
  font-weight: 300;
`;

const ToggleContainer = styled.div<{ isSponsor: boolean }>`
  position: relative;
  width: 2.5rem;
  height: 1.375rem;
  border-radius: 5rem;
  background-color: ${(props) => (props.isSponsor ? `${theme.color.main}` : '#BDBDBD')};
  cursor: pointer;
  transition: background-color 0.3s;

  .toggle-circle {
    position: absolute;
    top: 0.2rem;
    left: ${(props) => (props.isSponsor ? '1.25rem' : '0.25rem')};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s ease;
  }
`;
