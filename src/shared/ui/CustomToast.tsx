import { ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';
import theme from '../styles/theme';

export const CustomToast = () => {
  return (
    <StyledToastConatiner
      position="top-right"
      autoClose={1000}
      limit={1}
      hideProgressBar={true}
      theme="colored"
      closeButton={false}
    />
  );
};

export default CustomToast;

const StyledToastConatiner = styled(ToastContainer)`
  .Toastify__toast {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 1.6875rem;
    top: 1rem;
    right: 1rem;
    padding: 2rem 1.5rem;
    border-radius: 0.5rem;

    border: 2px solid ${theme.color.main};
    color: black;
    background-color: white;

    font-size: 1rem;
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
  }

  .Toastify__toast--info {
    // info 토스트 디자인
  }

  .Toastify__toast--error {
    // error 토스트 디자인
    border: none;
    color: white;
    background: ${theme.color.red};
    svg {
      fill: white !important;
    }
  }

  .Toastify__toast--success {
    border: none;
    color: white;
    background: ${theme.color.main};

    svg {
      fill: white !important;
    }
  }

  .Toastify__toast--warning {
    // warning 토스트 디자인
  }
`;
