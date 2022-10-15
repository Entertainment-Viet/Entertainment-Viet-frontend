import cRequest from 'utils/server';
import { removeEmptyObj } from 'utils/helpers';
import axios from 'axios';
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return response.status;
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

export function get(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  console.log(replaceUrl);
  return cRequest
    .get(replaceUrl, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function del(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .delete(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .post(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function put(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .put(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function getUrl(url, params) {
  return axios
    .get(url, params)
    .then(checkStatus)
    .then(parseJSON);
}
