/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  profile: () => t(translations.OrganizerManagementPage.profile),
  myPackage: () => t(translations.OrganizerManagementPage.myPackage),
  orders: () => t(translations.OrganizerManagementPage.orders),
  schedule: () => t(translations.OrganizerManagementPage.schedule),
  myAccount: () => t(translations.OrganizerManagementPage.myAccount),
  back: () => t(translations.OrganizerManagementPage.back),
  createPackage: () => t(translations.OrganizerManagementPage.createPackage),
  delete: () => t(translations.OrganizerManagementPage.delete),
  edit: () => t(translations.OrganizerManagementPage.edit),
  done: () => t(translations.OrganizerManagementPage.done),
  contact: () => t(translations.OrganizerManagementPage.contact),
  cancel: () => t(translations.OrganizerManagementPage.cancel),
  all: () => t(translations.OrganizerManagementPage.all),
  upcoming: () => t(translations.OrganizerManagementPage.upcoming),
  pending: () => t(translations.OrganizerManagementPage.pending),
  canceled: () => t(translations.OrganizerManagementPage.canceled),
  budget: () => t(translations.OrganizerManagementPage.budget),
  detail: () => t(translations.OrganizerManagementPage.detail),
  createEvent: () => t(translations.OrganizerManagementPage.createEvent),
  createPosition: () => t(translations.OrganizerManagementPage.createPosition),
  myEvents: () => t(translations.OrganizerManagementPage.myEvents),
  displayName: () => t(translations.OrganizerManagementPage.displayName),
  history: () => t(translations.OrganizerManagementPage.history),
  activity: () => t(translations.OrganizerManagementPage.activity),
  bio: () => t(translations.OrganizerManagementPage.bio),
  save: () => t(translations.OrganizerManagementPage.save),
  kycVerify: () => t(translations.OrganizerManagementPage.kycVerify),
  kycVerified: () => t(translations.OrganizerManagementPage.kycVerified),
  category: () => t(translations.OrganizerManagementPage.category),
};
