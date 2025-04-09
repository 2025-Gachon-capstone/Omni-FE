import styled from '@emotion/styled';

// (default) 기본 Input Style
const StyledInput = styled.input<{
  width: string;
}>`
  border: 0;
  border-bottom: 1px solid #999999;
  width: ${(props) => props.width};
  padding: 1rem 0.75rem;
  font-size: 1.25rem;
  box-sizing: border-box;

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

// (outline) 테두리 있는 Input Style
const OutlineStyledInput = styled(StyledInput)<{ border: string }>`
  background-color: white;
  border: ${(props) => props.border};
  border-radius: 8px;
`;

const Input = ({
  style,
  width,
  border,
  value,
  placeholder,
  type,
  onChange,
}: {
  style?: string;
  width?: string;
  border?: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return !style ? (
    // default style
    <StyledInput
      width={width || '21.4375rem'}
      value={value}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
    />
  ) : (
    // outline style
    <OutlineStyledInput
      border={border || '1px solid #595959'}
      width={width || '21.4375rem'}
      value={value}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
