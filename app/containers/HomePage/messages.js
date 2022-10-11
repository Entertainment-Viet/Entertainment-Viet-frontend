/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  welcome: () => t(translations.homePage.welcome),
  lookingTalent: () => t(translations.homePage.lookingTalent),
  postJob: () => t(translations.homePage.postJob),
  createPackage: () => t(translations.homePage.createPackage),
  popularTalent: () => t(translations.homePage.popularTalent),
  recentTalent: () => t(translations.homePage.recentTalent),
  editorChoice: () => t(translations.homePage.editorChoice),
  welcomeBox1: () => t(translations.homePage.welcomeBox1),
  welcomeBox2: () => t(translations.homePage.welcomeBox2),
};
