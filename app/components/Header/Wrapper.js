import styled from 'styled-components';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
export const NumWrapper = styled.div`
  white-space: nowrap;
  text-align: center;
  position: absolute;
  top: 43%;
  left: 62%;
  color: ${TEXT_PURPLE};
  font-size: 10px;
  text-align: center;
  width: auto;
  padding: 0 5px;
  background: ${TEXT_GREEN};
  border-radius: 80%;
  @media only screen and (max-width: 767px) {
    width: 20px;
    font-size: 8px;
  }
`;
