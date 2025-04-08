import styled from '@emotion/styled';
import useDevice from '../../hooks/useDevice';

type BubbleProps = {
  direction: 'left' | 'right';
  children: React.ReactNode;
};

const Bubble = ({ direction, children }: BubbleProps) => {
  const { isMobile } = useDevice();

  return (
    <BubbleBody
      padding={isMobile ? '1rem 1.5rem' : '1.75rem 2.25rem'}
      size={isMobile ? '1rem' : '1.5rem'}
      direction={direction}
    >
      {children}
      {direction === 'left' ? <LeftTail /> : <RightTail />}
    </BubbleBody>
  );
};

export default Bubble;

{
  /** 말풍선 바디 */
}
const BubbleBody = styled.div<{ padding: string; size: string; direction: string }>`
  position: relative;
  max-width: 30rem;
  padding: ${(props) => props.padding};
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: ${(props) => props.size};
  text-align: ${(props) => (props.direction === 'left' ? 'left' : 'right')};
  ${(props) => (props.direction === 'left' ? `margin-right: auto;` : `margin-left: auto;`)}
`;
{
  /** 말풍선 꼬리 */
}
const LeftTail = styled.div`
  position: absolute;
  top: 30px;
  left: -10px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 12px solid white;
`;
const RightTail = styled.div`
  position: absolute;
  top: 30px;
  right: -10px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid white;
`;
