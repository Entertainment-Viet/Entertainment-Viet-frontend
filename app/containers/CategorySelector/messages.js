/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  category: () => t(translations.createEventPage.category),
  subCategory: () => t(translations.createEventPage.subCategory),
};
