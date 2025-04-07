/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../styles/theme';

type StepInfo = {
  step: number; // 단계
  title: string; // step별 제목
  description: string; // step별 설명
};

export const StepSection = ({ step, title, description }: StepInfo) => {
  return (
    <div
      css={css`
        height: 18rem;
        max-width: 19rem;
        padding: 0.5rem 1rem 3.8rem 1rem;
        border: 2px solid #d9d9d9;
        border-radius: 12px;
      `}
    >
      <div
        css={css`
          color: #d9d9d9;
          font-weight: 800;
          font-size: 3rem;
        `}
      >
        0{step}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin: 3rem auto;
          padding: 0 2rem;
        `}
      >
        <div
          css={css`
            font-size: 2rem;
            font-weight: 700;
            color: ${theme.color.main};
          `}
        >
          {title}
        </div>
        <div
          css={css`
            font-size: 1.25rem;
            color: #505050;
          `}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
