/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  welcome: () => t(translations.registerPage.welcome),
  email: () => t(translations.registerPage.email),
  remember: () => t(translations.registerPage.remember),
  forgotPassword: () => t(translations.registerPage.forgotPassword),
  signin: () => t(translations.registerPage.signin),
  continueWith: () => t(translations.registerPage.continueWith),
  haveAccount: () => t(translations.registerPage.haveAccount),
  signup: () => t(translations.registerPage.signup),
  name: () => t(translations.registerPage.name),
};
