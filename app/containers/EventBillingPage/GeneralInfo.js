import React from 'react';
import { Box } from '@chakra-ui/react';
import { TEXT_GREEN } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { Title, Content } from './styles';
// If you want to use your own Selectors look up the Advancaed Story book examples
const GeneralInfo = ({ data }) => (
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
      <Content>10/10/2022 - 13/10/2022</Content>
    </Box>
    <Box>
      <Title>Total Bookings:&nbsp;</Title>
      <Content>15</Content>
    </Box>
    <Box>
      <Title>Total Outcome:&nbsp;</Title>
      <Content style={{ color: TEXT_GREEN }}>35000$</Content>
    </Box>
  </>
);
GeneralInfo.propTypes = {
  data: PropTypes.any,
};
export default GeneralInfo;
