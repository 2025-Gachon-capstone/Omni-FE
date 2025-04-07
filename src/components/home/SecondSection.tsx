/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { Fade } from 'react-awesome-reveal';
import useDevice from '../../hooks/useDevice';
import Bubble from './Bubble';

export const SecondSection = ({ ref }: { ref: React.ForwardedRef<HTMLDivElement> }) => {
  const { isMobile, isTablet } = useDevice();

  return (
    <div
      ref={ref}
      css={css`
        background-color: ${theme.color.main};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 7% 5% 15% 5%;
        font-weight: 600;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          font-size: ${isMobile ? '1.15rem' : isTablet ? '1.75rem' : '2.5rem'};
          font-weight: ${isMobile ? 600 : 700};
          color: white;
          margin-bottom: 10%;
        `}
      >
        <Fade delay={300} duration={500} cascade damping={0.1} triggerOnce>
          이런 고민 한번쯤 해보시지 않으셨나요?
        </Fade>
      </div>
      <div
        css={css`
          width: ${isMobile ? '90%' : '60%'};
          display: flex;
          flex-direction: column;
          gap: 5rem;
        `}
      >
        <Fade direction="up" delay={1} cascade damping={0.4}>
          <Bubble direction="left">
            <span>
              흩어져 있는 카드 혜택을 위해
              <br />
              <span
                css={css`
                  color: ${theme.color.main};
                `}
              >
                &nbsp;쓸데없이 많은 카드
              </span>
              를 발급받지 않으셨나요?
            </span>
          </Bubble>

          <Bubble direction="right">
            <span>
              기껏 발급받은 카드의
              <span
                css={css`
                  color: ${theme.color.main};
                `}
              >
                &nbsp;혜택을 잊고계시진
              </span>
              않나요?
            </span>
          </Bubble>
        </Fade>
      </div>
    </div>
  );
};
