import React, { useState } from 'react';
import { Box, Text, chakra, VStack } from '@chakra-ui/react';
import {
  SUB_BLU_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
  RED_COLOR,
} from 'constants/styles';
import Buttons from 'components/Buttons';
import { PropTypes } from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { post, del } from 'utils/request';
import {
  API_GET_BOOKING_TALENT_INFO,
  API_GET_BOOKING_ORG_INFO,
} from 'constants/api';
import { getResStatus, cacthResponse } from 'utils/helpers';
import FeedbackOfferModal from 'components/Modal/FeedbackOfferModal';
import { ENUM_BOOKING_STATUS } from '../../constants/enums';
import AcceptOfferModal from '../../components/Modal/AcceptOfferModal';

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
    justifyContent: 'space-between',
    height: '50rem',
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

const BookingGeneralCard = ({ data }) => {
  const id = window.localStorage.getItem('uid');
  const role = window.localStorage.getItem('role');
  const [isShowing, setIsShowing] = useState(false);
  const toggleModal = () => {
    setIsShowing(!isShowing);
    // loadPackage(inputId, match.params.id);
  };
  const [isShowing1, setIsShowing1] = useState(false);
  const toggleModal1 = () => {
    setIsShowing1(!isShowing1);
    // loadPackage(inputId, match.params.id);
  };
  function handleAccept() {
    if (role === 'talent')
      post(API_GET_BOOKING_TALENT_INFO, {}, id, data.uid).then(res1 => {
        const status1 = getResStatus(res1);
        if (status1 === '201') {
          console.log('sent');
        } else if (status1 === '400') {
          console.log('fail');
        } else {
          cacthResponse(res1);
        }
      });
    else if (role === 'organizer')
      post(API_GET_BOOKING_ORG_INFO, {}, id, data.uid).then(res1 => {
        const status1 = getResStatus(res1);
        if (status1 === '201') {
          console.log('sent');
        } else if (status1 === '400') {
          console.log('fail');
        } else {
          cacthResponse(res1);
        }
      });
  }
  function handleCancel() {
    if (role === 'talent')
      del(API_GET_BOOKING_TALENT_INFO, {}, id, data.uid).then(res1 => {
        const status1 = getResStatus(res1);
        if (status1 === '201') {
          console.log('sent');
        } else if (status1 === '400') {
          console.log('fail');
        } else {
          cacthResponse(res1);
        }
      });
    else if (role === 'organizer')
      del(API_GET_BOOKING_ORG_INFO, {}, id, data.uid).then(res1 => {
        const status1 = getResStatus(res1);
        if (status1 === '201') {
          console.log('sent');
        } else if (status1 === '400') {
          console.log('fail');
        } else {
          cacthResponse(res1);
        }
      });
  }
  return (
    <GradientBox>
      {console.log(data)}
      {!data ? (
        <PageSpinner />
      ) : (
        <>
          <VStack alignItems="flex-start">
            <Text color={TEXT_GREEN} as="h1">
              Booking Informations
            </Text>
            <Text>
              <b>Organizer:</b> {data.org.displayName}
            </Text>
            <Text>
              <b>Talent:</b> {data.talent.displayName}
            </Text>
            <Text>
              <b>Perform date and time:</b>{' '}
              {new Date(data.jobDetail.performanceStartTime).toLocaleString()} -{' '}
              {new Date(data.jobDetail.performanceEndTime).toLocaleString()}
            </Text>
            <Text>
              <b>Price:</b> {data.jobDetail.price.min} -{' '}
              {data.jobDetail.price.max}
            </Text>
            <Text>
              <b>Payment type:</b> {data.paymentType}
            </Text>
            <Text>
              <b>Paid:</b> {data.isPaid.toString()}
            </Text>
            <Text>
              <b>Status:</b> {data.status}
            </Text>
          </VStack>
          <VStack>
            {data.status === ENUM_BOOKING_STATUS.CONFIRMED ? (
              <Buttons
                width="100%"
                bg={TEXT_GREEN}
                color={SUB_BLU_COLOR}
                disabled={data.status !== ENUM_BOOKING_STATUS.TALENT_PENDING}
                onClick={toggleModal}
              >
                Confirm finished
              </Buttons>
            ) : (
              <Buttons
                width="100%"
                bg={TEXT_GREEN}
                color={SUB_BLU_COLOR}
                disabled={data.status !== ENUM_BOOKING_STATUS.TALENT_PENDING}
                onClick={handleAccept}
              >
                Accept offer
              </Buttons>
            )}

            <Buttons
              width="100%"
              bg={TEXT_PURPLE}
              color={SUB_BLU_COLOR}
              disabled={data.status !== ENUM_BOOKING_STATUS.TALENT_PENDING}
              onClick={toggleModal}
            >
              Offer new price
            </Buttons>
            <Buttons
              width="100%"
              bg={RED_COLOR}
              color={SUB_BLU_COLOR}
              disabled={data.status !== ENUM_BOOKING_STATUS.TALENT_PENDING}
              onClick={handleCancel}
            >
              Cancel
            </Buttons>
          </VStack>
        </>
      )}
      <FeedbackOfferModal
        data={data}
        onClose={() => toggleModal()}
        show={isShowing}
      />
      <AcceptOfferModal
        data={data}
        onClose={() => toggleModal1()}
        show={isShowing1}
      />
    </GradientBox>
  );
};
BookingGeneralCard.propTypes = {
  data: PropTypes.any,
};
export default BookingGeneralCard;
