export const API_SERVER = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'https://boiling-shore-81192.herokuapp.com';
/* COMMON */
export const API_LOGIN = '/auth/realms/ve-sso/protocol/openid-connect/token';
export const API_LOGOUT = '/auth/realms/ve-sso/protocol/openid-connect/logout';
export const API_ORG_REGISTER = '/api/users/organizers';
export const API_TAL_REGISTER = '/api/users/talents';
export const API_VERIFY_EMAIL = '/api/email/verification';
export const API_TRIGGER_RESET_EMAIL = '/api/email/pass-reset';
export const API_RESET_EMAIL = '/api/email-process/pass-reset';
/* NEWS */
export const API_NEWS_LIST = '/news/list';
export const API_NEWS_DETAIL = '/news/detail/'; // :id

/* org */
export const API_ORG_DETAIL = 'api/organizers/:id1';

/* TALENTS */
export const API_TALENT_LIST = 'api/talents';
export const API_TALENT_DETAIL = 'api/talents/:id1';
export const API_TALENT_PACKAGE = 'api/talents/:id1/packages';
export const API_TALENT_REVIEWS = 'api/talents/:id1/reviews';
export const API_TALENT_BOOKING = 'api/talents/:id1/bookings';
export const API_TALENT_KYC = 'api/talents/:id1/confidential';

/* MANAGER */
export const API_JOBOFFER_LIST = 'api/organizers/:id1/joboffers';
export const API_BOOKING_LIST = 'api/talents/:id1/bookings';
export const API_PACKAGE_LIST = 'api/talents/:id1/packages';

/* CONTACT FORM */
export const API_SEND_QNA = '/qna/send';

/* NOTIFICATION */
export const API_SEND_DEVICE_TOKEN = '/user/firebase/register-token';
export const API_DEL_DEVICE_TOKEN = '/user/firebase/remove-token';
export const API_GET_UNREAD_NOTI = '/user/get-userinfo';

/* ORGANIZER */
export const API_CREATE_BOOKING = 'api/organizers/:id1/bookings';
export const API_ORGANIZER_DETAIL = 'api/organizers/:id1';
export const API_ORGANIZER_KYC = 'api/organizers/:id1/confidential';

/* SHOPPINGCART */
export const API_GET_SHOPPINGCART = 'api/organizers/:id1/shoppingcart';
export const API_ORG_ACTION_SHOPPINGCART = 'api/organizers/:id1/shoppingcart';

/* PACKAGE */
export const API_GET_PACKAGE_INFO = 'api/talents/:id1/packages';

/* BOOKINGS */

export const API_GET_BOOKING_TALENT_INFO = 'api/talents/:id1/bookings/:id2';
export const API_GET_BOOKING_ORG_INFO = 'api/organizers/:id1/bookings/:id2';
export const API_TALENT_FINISH_BOOKING = 'api/talents/:id1/bookings/:id2/done';
export const API_ORG_FINISH_BOOKING = 'api/organizers/:id1/bookings/:id2/done';

/* EVENT */
export const API_LIST_EVENTS = 'api/organizers/:id1/events';
export const API_EVENT_POSITIONS = 'api/organizers/:id1/events/:id2/positions';
export const API_EVENT_POSITIONS_BOOKINGS =
  'api/organizers/:id1/events/:id2/positions/:id3/bookings';
export const API_EVENT_DETAIL = 'api/organizers/:id1/events/:id2';
export const API_EVENT_POSITION_DETAIL =
  'api/organizers/:id1/events/:id2/positions/:id3';
export const API_EVENT_BOOKINGS_LIST =
  'api/organizers/:id1/events/:id2/bookings';

/* CATEGORY */
export const API_GET_CATEGORIES = 'api/categories';
export const API_EVENT_SEARCH = 'api/events';

/* LOCATION */
export const API_GET_LOCATION = 'api/locations';

/* AWS */
export const API_UPLOAD_FILE = 'api/aws/files';
export const API_GET_FILE = 'api/aws/files/:key';

/* GENERAL */
export const API_GET_SCORE_TYPE = 'api/admin/:id1/scoreTypes';

/* NOTIFICATION */
export const API_GET_OLD_NOTI = 'api/notify/:id1/booking/list';
export const API_READ_NOTI = 'api/notify/:id1/booking/read';
export const API_COUNT_UNREAD = 'api/notify/:id1/booking/count';
