/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useDevice from '../../hooks/useDevice';

type BubbleProps = {
  direction: 'left' | 'right';
  children: React.ReactNode;
};

const Bubble = ({ direction, children }: BubbleProps) => {
  const { isMobile } = useDevice();

  return (
    <div
      css={css`
        position: relative;
        max-width: 45.6rem;
        padding: ${isMobile ? '1rem 1.5rem' : '1.75rem 2.25rem'};
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-size: ${isMobile ? '1rem' : '1.5rem'};
        text-align: ${direction == 'left' ? 'left' : 'right'};
        ${direction === 'left'
          ? `
            margin-right: auto;
          `
          : `
            margin-left: auto;
          `}
      `}
    >
      {children}
      <div
        css={css`
          position: absolute;
          top: 30px;
          ${direction === 'left'
            ? `
              left: -10px;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-right: 12px solid white;
            `
            : `
              right: -10px;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: 12px solid white;
            `}
        `}
      />
    </div>
  );
};

export default Bubble;
