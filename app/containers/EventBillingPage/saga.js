/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_EVENT_BOOKINGS_LIST, API_EVENT_DETAIL } from 'constants/api';
import { DATA_LOAD } from './constants';
import { loadDataSuccess, loadDataError } from './actions';
import {} from './selectors';

export function* getData(id) {
  const myId = localStorage.getItem('uid');
  try {
    const payload = yield call(
      get,
      API_EVENT_BOOKINGS_LIST,
      {
        size: 1000,
      },
      myId,
      id.id,
    );
    const event = yield call(get, API_EVENT_DETAIL, {}, myId, id.id);
    yield put(loadDataSuccess(payload, payload.bookings.paging, event));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(DATA_LOAD, getData);
}
