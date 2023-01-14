import axios from 'axios';
import { API_SERVER } from 'constants/api';
import { getCookie, setSecureCookie } from 'utils/cookie';
import { logout } from 'utils/auth';
import qs from 'qs';
import jwt from 'jwt-decode';

// import { getToken } from '../firebaseInit';

function getLocalToken() {
  const token = getCookie('token');
  return token;
}

// get token o refreshToken
function getLocalRefreshToken() {
  const token =
    getCookie('refreshToken') || window.localStorage.getItem('refreshToken');
  return token;
}

function getLocalAccessTokenExpire() {
  const expiry = window.localStorage.getItem('exp');
  return expiry;
}

const cRequest = axios.create({
  baseURL: API_SERVER,
  headers: {
    Accept: '*/*',
  },
});

cRequest.defaults.headers.get['content-type'] =
  'application/json; charset=utf-8';
cRequest.defaults.paramsSerializer = params => {
  let result = '';
  Object.keys(params).forEach(key => {
    result += `${key}=${encodeURIComponent(params[key])}&`;
  });
  return result.substr(0, result.length - 1);
};

cRequest.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';
cRequest.defaults.headers.put['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';
cRequest.defaults.headers.delete['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

cRequest.interceptors.request.use(async config => {
  // console.log('Starting Request', JSON.stringify(config, null, 2));
  // eslint-disable-next-line no-console
  console.log(Date.now() > getLocalAccessTokenExpire() * 1000);
  if (Date.now() > getLocalAccessTokenExpire() * 1000 || !getLocalToken()) {
    // eslint-disable-next-line no-console
    console.log('expired');
    const data = {
      client_id: 'backend',
      grant_type: 'refresh_token',
      refresh_token: getLocalRefreshToken(),
      scope: 'openid',
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: `${
        process.env.REACT_KEYCLOAK_API
      }/auth/realms/ve-sso/protocol/openid-connect/token`,
    };
    let result;
    try {
      result = await axios(options);
    } catch (err) {
      logout();
    }
    if (result.status === 200) {
      setSecureCookie(
        'token',
        result.data.access_token,
        jwt(result.data.access_token).exp,
      );
      // eslint-disable-next-line no-console
      console.log(jwt(result.data.access_token));
      window.localStorage.setItem('exp', jwt(result.data.access_token).exp);
    }
  }
  const accessToken = getLocalToken();
  // checking if accessToken exists
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

cRequest.interceptors.response.use(
  response => response,
  async error => {
    // extracting response and config objects
    const { response } = error;
    // checking if error is Aunothorized error
    if (response.status === 401) {
      // const deviceToken = await getToken();
      // const formData = new FormData();
      // formData.append('firebase_register_token', deviceToken);
      // const fData = Object.fromEntries(formData.entries());
      // await cRequest.post(API_DEL_DEVICE_TOKEN, fData);
      //   let refreshToken = localStorage.getItem("refreshToken");
      //   if (refreshToken) {
      //     //if refresh token exists in local storage proceed
      //     try {
      //       //try refreshing token
      //       const data = await cRequest.post("/refresh/", {
      //         refresh: refreshToken,
      //       });
      //       let accessToken = data.data.accessToken;
      //       if (accessToken) {
      //         //if request is successiful and token exists in response data
      //         //store it in local storage
      //         localStorage.setItem("accessToken", accessToken);
      //         //with new token retry original request
      //         config.headers["Authorization"] = accessToken;
      //         return cRequest(config);
      //       }
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }
      logout();
    }

    // eslint-disable-next-line no-empty
    if (response.status === 400) {
    }

    if (response.status === 500) {
      // setError(response);
      // refreshPage();
    }

    return Promise.resolve(response);
  },
);

export default cRequest;
