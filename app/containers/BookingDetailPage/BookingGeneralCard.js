/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
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
import { numberWithCommas, convertReadableTime } from 'utils/helpers';
import {
  API_GET_BOOKING_TALENT_INFO,
  API_GET_BOOKING_ORG_INFO,
} from 'constants/api';

import FeedbackOfferModal from 'components/Modal/FeedbackOfferModal';
import { useTranslation } from 'react-i18next';
import AcceptOfferModal from '../../components/Modal/AcceptOfferModal';
import ConfirmFinishModal from '../../components/Modal/ConfirmFinishModal';
import { globalMessages } from '../App/globalMessage';
import { ENUM_BOOKING_STATUS } from '../../constants/enums';
import { messages } from './messages';
import { useNotification } from '../../hooks/useNotification';

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
  const { notify } = useNotification();
  const { t } = useTranslation();
  const id = window.localStorage.getItem('uid');
  const role = window.localStorage.getItem('role');
  const [isShowing, setIsShowing] = useState(false);
  const [enable, setEnable] = useState(true);
  const toggleModal = () => {
    setIsShowing(!isShowing);
    // loadPackage(inputId, match.params.id);
  };
  const [isShowing1, setIsShowing1] = useState(false);
  const toggleModal1 = () => {
    setIsShowing1(!isShowing1);
    // loadPackage(inputId, match.params.id);
  };
  const [isShowing2, setIsShowing2] = useState(false);
  const toggleModal2 = () => {
    setIsShowing2(!isShowing2);
    // loadPackage(inputId, match.params.id);
  };
  function isEnableButton() {
    if (role === 'talent') {
      return data.status !== ENUM_BOOKING_STATUS.TALENT_PENDING;
    }
    if (role === 'organizer') {
      return data.status !== ENUM_BOOKING_STATUS.ORG_PENDING;
    }
    return true;
  }
  function handleAccept() {
    if (role === 'talent')
      post(API_GET_BOOKING_TALENT_INFO, {}, id, data.uid).then(res1 => {
        if (res1 > 300) {
          notify('Thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
          return;
        }
        notify('Thành công');
      });
    else if (role === 'organizer')
      post(API_GET_BOOKING_ORG_INFO, {}, id, data.uid).then(res1 => {
        if (res1 > 300) {
          notify('Thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
          return;
        }
        notify('Thành công');
      });
    // window.location.reload();
  }
  function handleCancel() {
    if (role === 'talent')
      del(API_GET_BOOKING_TALENT_INFO, {}, id, data.uid).then(res1 => {
        if (res1 > 300) {
          notify('Thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
          return;
        }
        notify('Thành công');
      });
    else if (role === 'organizer')
      del(API_GET_BOOKING_ORG_INFO, {}, id, data.uid).then(res1 => {
        if (res1 > 300) {
          notify('Thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
          return;
        }
        notify('Thành công');
      });
  }

  useEffect(() => {
    setEnable(isEnableButton());
  }, [data]);
  return (
    <GradientBox>
      {!data ? (
        <PageSpinner />
      ) : (
        <>
          <VStack alignItems="flex-start">
            <Text color={TEXT_GREEN} as="h1">
              {t(messages.bookingInfo())}
            </Text>
            <Text>
              <b>Organizer:</b> {data.organizerName}
            </Text>
            <Text>
              <b>Phone number:</b> {data.org.phoneNumber}
            </Text>
            <Text>
              <b>Talent:</b> {data.talent.displayName}
            </Text>
            <Text>
              <b>Phone number:</b> {data.talent.phoneNumber}
            </Text>
            <Text>
              <b>{t(messages.performTime())}</b>{' '}
              {convertReadableTime(data.jobDetail.performanceStartTime)} -{' '}
              {convertReadableTime(data.jobDetail.performanceEndTime)}
            </Text>
            <Text>
              <b>Giá nghệ sĩ yêu cầu:</b>{' '}
              {numberWithCommas(data.jobDetail.price.min)}
            </Text>
            <Text>
              <b>Giá organizer yêu cầu:</b>{' '}
              {numberWithCommas(data.jobDetail.price.max)}
            </Text>
            <Text>
              <b>{t(messages.paymentType())}</b>{' '}
              {t(globalMessages[data.paymentType])}
            </Text>
            <Text>
              <b>{t(messages.paid())}</b>{' '}
              {data.isPaid ? t(messages.isPaid()) : t(messages.isNotPaid())}
            </Text>
            <Text>
              <b>{t(messages.status())}</b> {t(globalMessages[data.status])}
            </Text>
            <Text>
              <b>VAT/PIT: </b> {numberWithCommas(Math.ceil(data.tax))}
            </Text>
            <Text>
              <b>{t(messages.cutoff())}: </b> {numberWithCommas(data.fee)}
            </Text>
            <Text>
              <b>Total: </b> {numberWithCommas(data.total)}
            </Text>
          </VStack>
          <VStack>
            {data.status === ENUM_BOOKING_STATUS.CONFIRMED ||
            data.status === ENUM_BOOKING_STATUS.TALENT_FINISHED ||
            data.status === ENUM_BOOKING_STATUS.ORG_FINISHED ? (
              <Buttons
                width="100%"
                bg={TEXT_GREEN}
                color={SUB_BLU_COLOR}
                onClick={toggleModal2}
              >
                {t(messages.confirmFinish())}
              </Buttons>
            ) : (
              <Buttons
                width="100%"
                bg={TEXT_GREEN}
                color={SUB_BLU_COLOR}
                disabled={enable}
                onClick={handleAccept}
              >
                {t(messages.accept())}
              </Buttons>
            )}

            <Buttons
              width="100%"
              bg={TEXT_PURPLE}
              color={SUB_BLU_COLOR}
              disabled={enable}
              onClick={toggleModal}
            >
              {t(messages.offer())}
            </Buttons>
            <Buttons
              width="100%"
              bg={RED_COLOR}
              color={SUB_BLU_COLOR}
              disabled={enable}
              onClick={handleCancel}
            >
              {t(messages.cancel())}
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
      <ConfirmFinishModal
        data={data}
        onClose={() => toggleModal2()}
        show={isShowing2}
      />
    </GradientBox>
  );
};
BookingGeneralCard.propTypes = {
  data: PropTypes.any,
};
export default BookingGeneralCard;
