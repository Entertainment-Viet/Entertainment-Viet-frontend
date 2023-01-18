import styled from 'styled-components';
import { TEXT_PURPLE } from 'constants/styles';
export const NumWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0.6875rem;
  color: ${TEXT_PURPLE};
  font-size: 0.625rem;
  text-align: center;
  width: 1.3125rem;
  padding: 0 0.3125rem;
  @media only screen and (max-width: 768px) {
    width: 1.25rem;
    font-size: 0.7rem;
    left: 0.85rem;
  }
  @media only screen and (max-width: 320px) {
    width: 1.25rem;
    font-size: 0.8rem;
    left: 1.2rem;
  }
`;
