/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  welcome: () => t(translations.loginPage.welcome),
  email: () => t(translations.loginPage.email),
  remember: () => t(translations.loginPage.remember),
  forgotPassword: () => t(translations.loginPage.forgotPassword),
  signin: () => t(translations.loginPage.signin),
  continueWith: () => t(translations.loginPage.continueWith),
  haveAccount: () => t(translations.loginPage.haveAccount),
  signup: () => t(translations.loginPage.signup),
};
