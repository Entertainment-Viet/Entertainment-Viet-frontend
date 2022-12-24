import styled from 'styled-components';
import { device } from 'constants/styles';

export const Wrapper = styled.div`
  display: block;
  padding: 2rem 0 1rem;
`;

export const NavBar = styled.div`
  text-align: center;
`;

export const RightBar = styled.div`
  text-align: center;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${device.mob} {
    top: 10px;
  }

  @media ${device.tab} {
    top: 10px;
  }

  @media ${device.lap} {
    top: 30px;
  }
`;
