export const API_SERVER = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'https://boiling-shore-81192.herokuapp.com';
/* COMMON */
export const API_LOGIN = '/auth/realms/ve-sso/protocol/openid-connect/token';
export const API_LOGOUT = '/auth/realms/ve-sso/protocol/openid-connect/logout';
/* NEWS */
export const API_NEWS_LIST = '/news/list';
export const API_NEWS_DETAIL = '/news/detail/'; // :id

/* org */
export const API_ORG_DETAIL = 'api/organizers/:id';

/* TALENTS */
export const API_TALENT_LIST = 'api/talents';
export const API_TALENT_DETAIL = 'api/talents/:id';
export const API_TALENT_PACKAGE = 'api/talents/:id/packages';

/* MANAGER */
export const API_JOBOFFER_LIST = 'api/organizers/:id/joboffers';
export const API_BOOKING_LIST = 'api/talents/:id/bookings';
export const API_PACKAGE_LIST = 'api/talents/:id/packages';

/* CONTACT FORM */
export const API_SEND_QNA = '/qna/send';

/* NOTIFICATION */
export const API_SEND_DEVICE_TOKEN = '/user/firebase/register-token';
export const API_DEL_DEVICE_TOKEN = '/user/firebase/remove-token';
export const API_GET_UNREAD_NOTI = '/user/get-userinfo';

/* ORGANIZER */
export const API_CREATE_BOOKING = 'api/organizers/:id/bookings';

/* SHOPPINGCART */
export const API_GET_SHOPPINGCART = 'api/organizers/:id/shoppingcart';
export const API_ORG_ACTION_SHOPPINGCART = 'api/organizers/:id/shoppingcart';

/* PACKAGE */
export const API_GET_PACKAGE_INFO = 'api/talents/:id/packages';
