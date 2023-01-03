import React from 'react';
import { Box } from '@chakra-ui/react';
import { TEXT_GREEN } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { handleAddress } from 'utils/helpers';
import { Title, Content } from './styles';
// If you want to use your own Selectors look up the Advancaed Story book examples
const GeneralInfo = ({ event, info }) => (
  <>
    {console.log(info.bookings.content)}
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
        {new Date(event.occurrenceStartTime).toLocaleString()} -{' '}
        {new Date(event.occurrenceEndTime).toLocaleString()}
      </Content>
    </Box>
    <Box>
      <Title>Event occurence place:&nbsp;</Title>
      <Content>
        {event.occurrenceAddress && handleAddress(event.occurrenceAddress)}
      </Content>
    </Box>
    <Box>
      <Title>Total Bookings:&nbsp;</Title>
      <Content>{info.bookings.content.length}</Content>
    </Box>
    <Box>
      <Title>Total Outcome:&nbsp;</Title>
      <Content styles={{ color: TEXT_GREEN }}>{info.total} VND</Content>
    </Box>
  </>
);
GeneralInfo.propTypes = {
  event: PropTypes.any,
  info: PropTypes.any,
};
export default GeneralInfo;
