/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  createDeal: () => t(translations.createCustomDeal.createDeal),
  title: () => t(translations.createEventPage.title),
  desc: () => t(translations.createEventPage.desc),
  category: () => t(translations.createEventPage.category),
  subCategory: () => t(translations.createEventPage.subCategory),
  skills: () => t(translations.createEventPage.skills),
  skillsDesc: () => t(translations.createEventPage.skillsDesc),
  workType: () => t(translations.createEventPage.workType),
  currency: () => t(translations.createEventPage.currency),
  submit: () => t(translations.createEventPage.submit),
  location: () => t(translations.createEventPage.location),
  startDate: () => t(translations.createEventPage.startDate),
  endDate: () => t(translations.createEventPage.endDate),
  paymentType: () => t(translations.createEventPage.paymentType),
  instantPay: () => t(translations.preCheckout.instantPay),
  laterPay: () => t(translations.preCheckout.laterPay),
  street: () => t(translations.KYCProfile.street),
  district: () => t(translations.KYCProfile.district),
  province: () => t(translations.KYCProfile.province),
};
