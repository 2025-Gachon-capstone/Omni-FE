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
  color: ${(props) => (props.disabled ? 'white' : props.textColor)};
  background-color: ${(props) => (props.disabled ? '#E8E8E8' : props.color)};
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
  disabled,
  children,
}: {
  width?: string;
  padding?: string;
  color?: string;
  textColor?: string;
  textSize?: string;
  border?: string;
  disabled?: boolean;
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
      disabled={disabled || false}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
