/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import useDevice from '../../hooks/useDevice';
import CardImg from '../../assets/img/landingImg.svg';

export const ThirdSection = () => {
  const { isMobile } = useDevice();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${isMobile ? 'column' : 'row'};
        justify-content: center;
        align-items: center;
        gap: 8rem;
        padding: 12% 5% 15% 5%;
        font-weight: 600;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          ${isMobile && `margin-right:auto`};
        `}
      >
        <ChatEmoji />
        <div
          css={css`
            font-size: 1.5rem;

            font-weight: 600;
            color: ${theme.color.main};
          `}
        >
          카드 하나로
        </div>
        <div
          css={css`
            font-size: 1.75rem;
            font-weight: 700;
          `}
        >
          숨겨진 나만의 혜택을 <br />
          누려보세요!
        </div>
      </div>
      <div
        css={css`
          max-width: 39rem;
        `}
      >
        <img src={CardImg} alt="카드미리보기" width={`100%`} />
      </div>
    </div>
  );
};

{
  /** 챗이모지 컴포넌트 */
}
const ChatEmoji = () => {
  return (
    <div
      css={css`
        position: relative;
        height: 2rem;
        width: 3rem;
        margin-left: -1rem;
        margin-bottom: 1rem;
        background-color: ${theme.color.main};
        border-radius: 0.5rem;
      `}
    >
      <div
        css={css`
          height: 1rem;
          position: absolute;
          bottom: -25px;
          left: 10px;
          border-left: 10px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid ${theme.color.main};
        `}
      />
    </div>
  );
};
