/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  street: () => t(translations.KYCProfile.street),
  district: () => t(translations.KYCProfile.district),
  province: () => t(translations.KYCProfile.province),
};
