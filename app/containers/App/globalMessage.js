/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';
import {
  ENUM_BOOKING_STATUS,
  ENUM_PAYMENT_TYPE,
  ENUM_WORK_TYPE,
} from '../../constants/enums';

export const globalMessages = {
  [ENUM_BOOKING_STATUS.ARCHIVED]: t(translations.globalMessages.ARCHIVED),
  [ENUM_BOOKING_STATUS.CONFIRMED]: t(translations.globalMessages.CONFIRMED),
  [ENUM_BOOKING_STATUS.FINISHED]: t(translations.globalMessages.FINISHED),
  [ENUM_BOOKING_STATUS.TALENT_PENDING]: t(
    translations.globalMessages.TALENT_PENDING,
  ),
  [ENUM_BOOKING_STATUS.ORG_PENDING]: t(translations.globalMessages.ORG_PENDING),
  [ENUM_BOOKING_STATUS.CANCELLED]: t(translations.globalMessages.CANCELLED),
  [ENUM_BOOKING_STATUS.FINISHED]: t(translations.globalMessages.FINISHED),
  [ENUM_BOOKING_STATUS.TALENT_FINISHED]: t(
    translations.globalMessages.TALENT_FINISHED,
  ),
  [ENUM_BOOKING_STATUS.ORG_FINISHED]: t(
    translations.globalMessages.ORG_FINISHED,
  ),
  [ENUM_PAYMENT_TYPE.ONLINE]: t(translations.globalMessages.ONLINE),
  [ENUM_PAYMENT_TYPE.OFFLINE]: t(translations.globalMessages.OFFLINE),
  [ENUM_WORK_TYPE.SINGLE_SHOW]: t(translations.globalMessages.SINGLE_SHOW),
  [ENUM_WORK_TYPE.SINGLE_TIME]: t(translations.globalMessages.SINGLE_TIME),
  [ENUM_WORK_TYPE.PERIOD_CONTRACT]: t(
    translations.globalMessages.PERIOD_CONTRACT,
  ),
};
