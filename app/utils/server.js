import axios from 'axios';
import { API_SERVER, API_DEL_DEVICE_TOKEN } from 'constants/api';
import { getAuthCookie, eraseAuthCookie } from 'utils/cookie';
import { logout } from 'utils/auth';
// import { getToken } from '../firebaseInit';

const cRequest = axios.create({
  baseURL: API_SERVER,
  headers: {
    // 'Request-Origin': 'https://congtroi.org',
    Accept: 'application/json',
  },
});

cRequest.defaults.headers.get['content-type'] =
  'application/json; charset=utf-8';
// cRequest.defaults.headers.post['Content-Type'] = 'multipart/form-data';
cRequest.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

cRequest.interceptors.request.use(config => {
  // console.log('Starting Request', JSON.stringify(config, null, 2));
  const accessToken = getAuthCookie();
  // checking if accessToken exists
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = accessToken;
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
      eraseAuthCookie();
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

    if (response.status === 400) {}

    if (response.status === 500) {
      // setError(response);
      // refreshPage();
    }

    return Promise.resolve(response);
  },
);

export default cRequest;
