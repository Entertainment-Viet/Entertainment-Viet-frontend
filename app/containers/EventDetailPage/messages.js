/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  overview: () => t(translations.artistDetailPage.overview),
  about: () => t(translations.eventDetailPage.about),
  review: () => t(translations.artistDetailPage.review),
  comment: () => t(translations.artistDetailPage.comment),
  description: () => t(translations.eventDetailPage.description),
  basicInfo: () => t(translations.eventDetailPage.basicInfo),
  questions: () => t(translations.artistDetailPage.questions),
  seeMore: () => t(translations.artistDetailPage.seeMore),
  allComment: () => t(translations.artistDetailPage.allComment),
  schedule: () => t(translations.artistDetailPage.schedule),
  artistStory: () => t(translations.artistDetailPage.artistStory),
  artistActivity: () => t(translations.artistDetailPage.artistActivity),
};
