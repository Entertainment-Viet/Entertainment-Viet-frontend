/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { LOAD_INFO } from './constants';
import {} from 'constants/api';
import { loadInfoSuccess, loadInfoError } from './actions';
import {} from './selectors';

export function* getData() {
  try {
    const data = yield call(get, '/api/events', { size: 12 });
    yield put(loadInfoSuccess(data));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_INFO, getData);
}
