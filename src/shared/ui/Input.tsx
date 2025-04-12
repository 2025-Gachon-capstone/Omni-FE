import styled from '@emotion/styled';
import React from 'react';

// (default) 기본 스타일 input
const StyledInput = styled.input<{ width: string }>`
  border: 0;
  border-bottom: 1px solid #999999;
  width: ${(props) => props.width};
  max-width: 21.4375rem;
  padding: 1rem 0.75rem;
  font-size: 1.25rem;
  box-sizing: border-box;

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  &::placeholder {
    color: #999999;
  }
`;

// (outline) 아웃라인 스타일 input
const OutlineStyledInput = styled(StyledInput)<{ border: string }>`
  background-color: white;
  border: ${(props) => props.border};
  border-radius: 8px;
`;

// InputProps
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  border?: string;
  styleType?: 'default' | 'outline';
}

const Input: React.FC<InputProps> = ({
  styleType = 'default',
  width = '100%',
  border = '1px solid #595959',
  ...props
}) => {
  if (styleType === 'outline') {
    return <OutlineStyledInput width={width} border={border} {...props} />;
  }
  return <StyledInput width={width} {...props} />;
};

export default Input;
