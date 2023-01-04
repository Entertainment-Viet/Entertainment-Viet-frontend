/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { TEXT_GREEN } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Title, Content } from './styles';
import { makeSelectStart, makeSelectEnd } from './slice/selectors';

// If you want to use your own Selectors look up the Advancaed Story book examples
const GeneralInfo = ({ data, start, end }) => (
  <>
    <Box
      color={TEXT_GREEN}
      fontWeight="600"
      fontSize="25px"
      sx={{
        marginBottom: '25px',
      }}
    >
      Booking Information
    </Box>
    <Box>
      <Title>Event occurence date:&nbsp;</Title>
      <Content>
        {end && start
          ? `${new Date(start).toLocaleString()} - ${new Date(
            end,
          ).toLocaleString()}`
          : null}
      </Content>
    </Box>
    <Box>
      <Title>Total Bookings:&nbsp;</Title>
      <Content>{data.bookings.content.length}</Content>
    </Box>
  </>
);
GeneralInfo.propTypes = {
  data: PropTypes.any,
  start: PropTypes.any,
  end: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  start: makeSelectStart(),
  end: makeSelectEnd(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(GeneralInfo);
