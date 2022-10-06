import { getCookie, eraseCookie } from 'utils/cookie';
import { redirectLogin } from 'utils/helpers';

const isBrowser = typeof window !== `undefined`;

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const Token = getCookie('refreshToken');

  return !!Token;
};

export function getLocalToken() {
  const token = getCookie('token');
  return token;
}

export function getLocalRole() {
  const token = window.localStorage.getItem('role');
  return token;
}

export function getLocalRefreshToken() {
  const token = getCookie('refreshToken');
  return token;
}

export function getLocalAccessTokenExpire() {
  const expiry = window.localStorage.getItem('exp');
  return expiry;
}

// export const isAuthor = () => {
//   if (!isBrowser) return false;

//   const mUser = getUser();
//   return mUser.role === ENUM_USER_ROLE.AUT;
// };

export const logout = () => {
  if (!isBrowser) return;
  eraseCookie('token');
  eraseCookie('refreshToken');
  window.localStorage.removeItem('exp');
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
  redirectLogin();
};
