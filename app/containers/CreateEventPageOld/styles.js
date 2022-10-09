import styled, { css } from 'styled-components';

const Control = css`
  background: #eff0f6;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #1c1c28;
  letter-spacing: 0.75px;

  padding: 12px 24px;
  border-radius: 12px;

  border: 0px;
  width: 100%;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export const UploadInput = styled.input`
  ${Control};
  background: transparent;
  &::placeholder {
    color: transparent;
  }
  padding: 12px 24px;
  color: #14142b;
  font-size: 18px;
  line-height: 19px;
`;
