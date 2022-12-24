/**
 * Wrapper a page
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from 'constants/styles';

const Wrapper = styled.div`
  @media ${device.mob} {
    width: 100%;
    padding: 0px 2rem;
    margin: 0 auto;
  }
  @media ${device.tab} {
    padding: 0px 2rem;
    width: 100%;
    margin: 4rem auto;
  }
  @media ${device.lap} {
    padding: 0px 1rem 1.5rem 1rem;
    width: 100%;
    padding-left: 3rem;
    // margin-right: auto;
  }
`;

function PageWrapper(props) {
  return (
    <Wrapper className={props.className}>
      {Children.toArray(props.children)}
    </Wrapper>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
};

export default PageWrapper;
