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
  methodPay: () => t(translations.preCheckout.methodPay),
  methodDesc: () => t(translations.preCheckout.methodDesc),
  methodDescPay: () => t(translations.preCheckout.methodDescPay),
  instantPay: () => t(translations.preCheckout.instantPay),
  laterPay: () => t(translations.preCheckout.laterPay),
  packageTitle: () => t(translations.preCheckout.packageCheckout.package),
  packagePrice: () => t(translations.preCheckout.packageCheckout.price),
  packageAction: () => t(translations.preCheckout.packageCheckout.action),
  packageBoxDelete: () => t(translations.preCheckout.packageCheckout.delete),
  packageBoxEdit: () => t(translations.preCheckout.packageCheckout.edit),
  packageBoxTime: () => t(translations.preCheckout.packageCheckout.time),
  packageBoxLocation: () =>
    t(translations.preCheckout.packageCheckout.location),
  packageBoxTotal: () => t(translations.preCheckout.packageCheckout.total),
  packageBoxSelected: () =>
    t(translations.preCheckout.packageCheckout.selected),
};
