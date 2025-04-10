import styled from '@emotion/styled';
import theme from '../styles/theme';

const StyledButton = styled.button<{
  width: string;
  padding: string;
  color: string;
  textColor: string;
  textSize: string;
  border: string;
}>`
  border-radius: 8px;
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  height: auto;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.textColor};
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  transition: all 0.2s ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({
  width,
  padding,
  color,
  textColor,
  textSize,
  border,
  onClick,
  children,
}: {
  width?: string;
  padding?: string;
  color?: string;
  textColor?: string;
  textSize?: string;
  border?: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <StyledButton
      width={width || '21rem'}
      padding={padding || '1rem 1.25rem'}
      color={color || `${theme.color.main}`}
      textColor={textColor || 'white'}
      textSize={textSize || '1.25rem'}
      border={border || '0'}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
