import React from 'react';
import {
  Box,
  Text,
  chakra,
  UnorderedList,
  ListItem,
  Divider,
  Container,
} from '@chakra-ui/react';
import { SUB_BLU_COLOR, TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import { H1 } from 'components/Elements';
import { PropTypes } from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import parserHtml from 'utils/html';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { globalMessages } from '../App/globalMessage';
import { handleAddress } from '../../utils/helpers';

const GradientBox = chakra(Box, {
  baseStyle: {
    flex: 1,
    width: '100%',
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'inherit',
    borderRadius: '4px',
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: SUB_BLU_COLOR,
    position: 'relative',
    backgroundClip: 'padding-box',
    px: '2rem',
    py: '2rem',
    _before: {
      content: `""`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      margin: '-2px',
      borderRadius: 'inherit',
      background:
        'linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404B8D 100%)',
    },
  },
});
// If you want to use your own Selectors look up the Advancaed Story book examples
const BookingDetailCard = ({ data }) => {
  const { t } = useTranslation();
  return (
    <GradientBox>
      {!data ? (
        <PageSpinner />
      ) : (
        <>
          <Text color={TEXT_GREEN} as="h1">
            {t(messages.bookingDetail())}
          </Text>
          <H1 color={TEXT_PURPLE} py={0} mb={-2}>
            {data.name}
          </H1>
          <H1 color={TEXT_PURPLE} py={0} mb={-2}>
            {data.packageName ? data.packageName : 'Custom booking'}
          </H1>
          <Text color={TEXT_PURPLE} mt={6}>
            {t(messages.detail())}
          </Text>
          <UnorderedList>
            <ListItem>
              <Text>
                {t(messages.location())}:{' '}
                {handleAddress(data.jobDetail.location)}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Time:{' '}
                {new Date(data.jobDetail.performanceStartTime).toLocaleString()}{' '}
                - {new Date(data.jobDetail.performanceEndTime).toLocaleString()}
              </Text>
            </ListItem>
            <ListItem>
              <Text>Note: </Text>
              <Container ms={2}>
                <Text>{parserHtml(data.jobDetail.note)} </Text>
              </Container>
            </ListItem>
          </UnorderedList>
          <Divider mt={6} />
          <Text color={TEXT_PURPLE} mt={6}>
            {t(messages.skillRequired())} (coming soon)
          </Text>
          <Text color={TEXT_PURPLE} mt={6}>
            {t(messages.workType())}{' '}
            {t(globalMessages[data.jobDetail.workType])}
          </Text>
        </>
      )}
    </GradientBox>
  );
};
BookingDetailCard.propTypes = {
  data: PropTypes.any,
};
export default BookingDetailCard;
