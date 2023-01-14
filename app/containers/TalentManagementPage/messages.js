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
  displayName: () => t(translations.TalentManagementPage.displayName),
  history: () => t(translations.TalentManagementPage.history),
  activity: () => t(translations.TalentManagementPage.activity),
  bio: () => t(translations.TalentManagementPage.bio),
  save: () => t(translations.TalentManagementPage.save),
  kycVerify: () => t(translations.TalentManagementPage.kycVerify),
  kycVerified: () => t(translations.TalentManagementPage.kycVerified),
  category: () => t(translations.TalentManagementPage.category),
  subCategory: () => t(translations.TalentManagementPage.subCategory),
  incomeRange: () => t(translations.TalentManagementPage.incomeRange),
  locationDistrict: () => t(translations.loginPage.locationDistrict),
  locationCity: () => t(translations.loginPage.locationCity),
  billing: () => t(translations.OrganizerManagementPage.billing),
  imageThumbnails: () => t(translations.TalentManagementPage.imageThumbnails),
};
