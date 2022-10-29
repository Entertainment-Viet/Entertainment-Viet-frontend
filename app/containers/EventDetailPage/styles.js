import styled from 'styled-components';
import { device } from 'constants/styles';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media ${device.mob} {
    flex-direction: column;
  }
  @media ${device.tab} {
    flex-direction: column;
  }
`;
export const FilterLeft = styled.div`
  flex: 1;
`;
export const FilterRight = styled.div`
  flex: 1;
  @media ${device.lap} {
    text-align: right;
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media ${device.mob} {
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled.div`
  display: block;
  @media ${device.lap} {
    text-align: right;
  }
`;

export const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const OrganizationItem = styled.a`
  color: #9f9acb;
  cursor: pointer;
  padding: 1.25rem 3rem;
  font-size: 1.5rem;
  margin-bottom: -2px;
  &:hover,
  &:active,
  &.active {
    color: #2f4797;
    border-bottom: 2px solid #2f4797;
  }
`;
