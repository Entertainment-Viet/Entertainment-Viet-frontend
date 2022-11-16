import React from 'react';
import { Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import { H1 } from 'components/Elements';
import { PropTypes } from 'prop-types';
import parserHtml from 'utils/html';
const EventDetail = ({ data }) => (
  <>
    <Text color={TEXT_GREEN} as="h1" fontSize="30px">
      Event Detail
    </Text>
    <H1 color={TEXT_PURPLE} py={0} mb={-2}>
      Event 1
    </H1>
    <Text color={TEXT_PURPLE} mt={6}>
      Details
    </Text>
    <UnorderedList>
      <ListItem>
        <Text>Location: 785/51 NK</Text>
      </ListItem>
      <ListItem>
        <Text>
          Note: {parserHtml('<p>daiw idjaowij dioajd ioajw iod </p>')}{' '}
        </Text>
      </ListItem>
    </UnorderedList>
  </>
);
EventDetail.propTypes = {
  data: PropTypes.any,
};
export default EventDetail;
