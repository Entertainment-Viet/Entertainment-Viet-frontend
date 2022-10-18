/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  orgInfo: () => t(translations.Modal.orgInfo),
  priceRange: () => t(translations.Modal.priceRange),
  postDesc: () => t(translations.Modal.postDesc),
  performanceTime: () => t(translations.Modal.performanceTime),
  goToDetail: () => t(translations.Modal.goToDetail),
  location: () => t(translations.Modal.location),
};
