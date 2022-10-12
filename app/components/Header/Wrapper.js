import styled from 'styled-components';
import { TEXT_PURPLE } from 'constants/styles';
export const NumWrapper = styled.div`
  position: absolute;
  top: 57%;
  right: 77px;
  color: ${TEXT_PURPLE};
  font-size: 10px;
  text-align: center;
  width: 21px;
  padding: 0 5px;
  @media only screen and (max-width: 767px) {
    width: 20px;
    font-size: 8px;
  }
`;
