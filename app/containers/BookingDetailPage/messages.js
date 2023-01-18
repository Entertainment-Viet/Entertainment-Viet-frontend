/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  bookingInfo: () => t(translations.bookingDetailPage.bookingInfo),
  performTime: () => t(translations.bookingDetailPage.performTime),
  price: () => t(translations.bookingDetailPage.price),
  paymentType: () => t(translations.bookingDetailPage.paymentType),
  paid: () => t(translations.bookingDetailPage.paid),
  status: () => t(translations.bookingDetailPage.status),
  confirmFinish: () => t(translations.bookingDetailPage.confirmFinish),
  accept: () => t(translations.bookingDetailPage.accept),
  offer: () => t(translations.bookingDetailPage.offer),
  cancel: () => t(translations.bookingDetailPage.cancel),
  isPaid: () => t(translations.bookingDetailPage.isPaid),
  isNotPaid: () => t(translations.bookingDetailPage.isNotPaid),
  bookingDetail: () => t(translations.bookingDetailPage.bookingDetail),
  detail: () => t(translations.bookingDetailPage.detail),
  location: () => t(translations.bookingDetailPage.location),
  skillRequired: () => t(translations.bookingDetailPage.skillRequired),
  workType: () => t(translations.bookingDetailPage.workType),
  cutoff: () => t(translations.bookingDetailPage.cutoff),
};
