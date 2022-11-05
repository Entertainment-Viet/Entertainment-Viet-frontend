/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  overview: () => t(translations.preCheckout.overview),
  overviewDesc: () => t(translations.preCheckout.overviewDesc),
  method: () => t(translations.preCheckout.method),
  methodDesc: () => t(translations.preCheckout.methodDesc),
  instantPay: () => t(translations.preCheckout.instantPay),
  laterPay: () => t(translations.preCheckout.laterPay),
  packageTitle: () => t(translations.preCheckout.tableTitle.package),
  packagePrice: () => t(translations.preCheckout.tableTitle.price),
  packageAction: () => t(translations.preCheckout.tableTitle.action),
  packageBoxDelete: () => t(translations.preCheckout.tableTitle.delete),
  packageBoxEdit: () => t(translations.preCheckout.tableTitle.edit),
};
