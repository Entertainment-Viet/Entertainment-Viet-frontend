/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery, select } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_BOOKING_LIST } from 'constants/api';
import { ENUM_BOOKING_STATUS } from 'constants/enums';
import { DATA_LOAD } from './constants';
import { loadDataSuccess, loadDataError } from './actions';
import { makeSelectEnd, makeSelectStart } from './selectors';
export function* getData() {
  const myId = localStorage.getItem('uid');
  try {
    const startTime = yield select(makeSelectStart());
    const endTime = yield select(makeSelectEnd());
    const payload = yield call(
      get,
      API_BOOKING_LIST,
      {
        size: 1000,
        startTime,
        endTime,
        status: ENUM_BOOKING_STATUS.FINSIHED,
      },
      myId,
    );
    yield put(loadDataSuccess(payload, payload.bookings.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(DATA_LOAD, getData);
}
