import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { RED_COLOR } from 'constants/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;
const PageSpinner = () => (
  <Wrapper>
    <PropagateLoader size={30} color={RED_COLOR} />
  </Wrapper>
);

export default PageSpinner;
