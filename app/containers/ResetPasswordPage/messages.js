import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  confirmPassword: () => t(translations.resetPasswordPage.confirmPassword),
  enterNewPassword: () => t(translations.resetPasswordPage.enterNewPassword),
  newPassword: () => t(translations.resetPasswordPage.newPassword),
  passwordRequirement: () =>
    t(translations.resetPasswordPage.passwordRequirement),
  reset: () => t(translations.resetPasswordPage.reset),
  resetPassword: () => t(translations.resetPasswordPage.resetPassword),
  placeHolderEnterPassword: () =>
    t(translations.resetPasswordPage.placeHolderEnterPassword),
  placeHolderConfirmPassword: () =>
    t(translations.resetPasswordPage.placeHolderConfirmPassword),
};
