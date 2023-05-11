/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  createEvent: () => t(translations.createEventPage.createEvent),
  title: () => t(translations.createEventPage.title),
  desc: () => t(translations.createEventPage.desc),
  category: () => t(translations.createEventPage.category),
  subCategory: () => t(translations.createEventPage.subCategory),
  skills: () => t(translations.createEventPage.skills),
  skillsDesc: () => t(translations.createEventPage.skillsDesc),
  workType: () => t(translations.createEventPage.workType),
  currency: () => t(translations.createEventPage.currency),
  submit: () => t(translations.createEventPage.submit),
  formOfWork: () => t(translations.createEventPage.formOfWork),
  paymentMethod: () => t(translations.createEventPage.paymentMethod),
  prepay: () => t(translations.createEventPage.prepay),
  postPaid: () => t(translations.createEventPage.postPaid),
  street: () => t(translations.KYCProfile.street),
  district: () => t(translations.KYCProfile.district),
  imageThumbnails: () => t(translations.TalentManagementPage.imageThumbnails),
  hashtagForEvent: () => t(translations.createEventPage.hashtagForEvent),
};
