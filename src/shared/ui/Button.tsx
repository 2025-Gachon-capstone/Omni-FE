import styled from '@emotion/styled';
import theme from '../styles/theme';

const StyledButton = styled.button<{
  width: string;
  padding: string;
  color: string;
  textColor: string;
  border: string;
}>`
  border-radius: 8px;
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  font-size: 1.25rem;
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
  border,
  onClick,
  children,
}: {
  width?: string;
  padding?: string;
  color?: string;
  textColor?: string;
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
      border={border || '0'}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
