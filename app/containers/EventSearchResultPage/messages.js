/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  header: () => t(translations.loginPage.header),
  email: () => t(translations.loginPage.email),
  password: () => t(translations.loginPage.password),
  login: () => t(translations.loginPage.login),
  register: () => t(translations.loginPage.register),
  forgot: () => t(translations.loginPage.forgot),
  error: () => t(translations.loginPage.error),
  success: () => t(translations.loginPage.success),
  errorUser: () => t(translations.loginPage.errorUser),
  errorEmail: () => t(translations.loginPage.errorEmail),
  resendActive: () => t(translations.loginPage.resendActive),
  resendSuccess: () => t(translations.loginPage.resendSuccess),
  resendError: () => t(translations.loginPage.resendError),
  incomeRange: () => t(translations.loginPage.incomeRange),
  locationDistrict: () => t(translations.loginPage.locationDistrict),
  locationCity: () => t(translations.loginPage.locationCity),
};
