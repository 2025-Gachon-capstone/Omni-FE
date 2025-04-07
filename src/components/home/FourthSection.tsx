/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { StepSection } from './StepSection';
import { data } from '../../data/StepData';
import { Fade } from 'react-awesome-reveal';

export const FourthSection = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3.75rem;
        padding: 12% 5% 15% 5%;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        `}
      >
        <div
          css={css`
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: ${theme.color.main};
          `}
        ></div>
        <div
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
            color: ${theme.color.main};
          `}
        >
          Service step
        </div>
        <div
          css={css`
            font-size: 2rem;
            font-weight: 800;
          `}
        >
          서비스 이용방법
        </div>
      </div>
      {/** 카드섹션 */}
      <div
        css={css`
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        `}
      >
        <Fade cascade damping={0.3}>
          {data.map((el) => {
            return (
              <StepSection
                key={el.step}
                step={el.step}
                title={el.title}
                description={el.description}
              />
            );
          })}
        </Fade>
      </div>
    </div>
  );
};
