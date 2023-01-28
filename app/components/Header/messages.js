/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';
import {} from 'constants/routes';

export const messages = {
  findTalent: () => t(translations.header.findTalent),
  findEvent: () => t(translations.header.findEvent),
  postJob: () => t(translations.header.postJob),
  openJob: () => t(translations.header.openJob),
  soloSinger: () => t(translations.header.soloSinger),
  band: () => t(translations.header.band),
  dancer: () => t(translations.header.dancer),
  instru: () => t(translations.header.instru),
  dj: () => t(translations.header.dj),
  stylish: () => t(translations.header.stylish),
  makeup: () => t(translations.header.makeup),
  bartender: () => t(translations.header.bartender),
  packageBoxTime: () => t(translations.header.packageBox.time),
  packageBoxLocation: () => t(translations.header.packageBox.location),
  packageBoxEdit: () => t(translations.header.packageBox.edit),
  packageBoxDelete: () => t(translations.header.packageBox.delete),
  packageBoxPay: () => t(translations.header.packageBox.viewCart),
};
