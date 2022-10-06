/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  welcome: () => t(translations.forgotPasswordPage.welcome),
  email: () => t(translations.forgotPasswordPage.email),
  forgotPassword: () => t(translations.forgotPasswordPage.forgotPassword),
  forgot: () => t(translations.forgotPasswordPage.forgot),
  send: () => t(translations.forgotPasswordPage.send),
};
