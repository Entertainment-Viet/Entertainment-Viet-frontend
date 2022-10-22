/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  profile: () => t(translations.TalentManagementPage.profile),
  myPackage: () => t(translations.TalentManagementPage.myPackage),
  orders: () => t(translations.TalentManagementPage.orders),
  schedule: () => t(translations.TalentManagementPage.schedule),
  myAccount: () => t(translations.TalentManagementPage.myAccount),
  back: () => t(translations.TalentManagementPage.back),
  createPackage: () => t(translations.TalentManagementPage.createPackage),
  delete: () => t(translations.TalentManagementPage.delete),
  edit: () => t(translations.TalentManagementPage.edit),
  done: () => t(translations.TalentManagementPage.done),
  contact: () => t(translations.TalentManagementPage.contact),
  cancel: () => t(translations.TalentManagementPage.cancel),
  all: () => t(translations.TalentManagementPage.all),
  upcoming: () => t(translations.TalentManagementPage.upcoming),
  pending: () => t(translations.TalentManagementPage.pending),
  canceled: () => t(translations.TalentManagementPage.canceled),
  budget: () => t(translations.TalentManagementPage.budget),
  detail: () => t(translations.TalentManagementPage.detail),
  createEvent: () => t(translations.OrganizerManagementPage.createEvent),
  createPosition: () => t(translations.OrganizerManagementPage.createPosition),
  myEvents: () => t(translations.OrganizerManagementPage.myEvents),
};
