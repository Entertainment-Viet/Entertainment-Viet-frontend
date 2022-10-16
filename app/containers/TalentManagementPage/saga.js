/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_PACKAGE_LIST, API_ORG_DETAIL } from 'constants/api';
import { LOAD_PACKAGES, LOAD_BOOKING_PACKAGES } from './constants';
import { loadInfoSuccess, loadInfoError } from './actions';
import { makeSelectMode, makeSelectPackage, makeSelectPage } from './selectors';

export function* getData() {
  const myId = window.localStorage.getItem('uid');
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_PACKAGE_LIST, {}, myId);
    } else {
      const packageId = yield select(makeSelectPackage());
      // const page = yield select(makeSelectPage());
      payload = yield call(
        get,
        `${API_PACKAGE_LIST}/${packageId}/bookings`,
        {},
        myId,
      );
      const booker = yield all(
        payload.content.map(el =>
          call(get, `${API_ORG_DETAIL}`, {}, el.organizerId),
        ),
      );
      payload.content = payload.content.map((p, index) => ({
        ...p,
        booker: booker[index],
      }));
    }
    yield put(loadInfoSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export function* getBookingData() {
  const myId = window.localStorage.getItem('uid');
  try {
    const packageId = yield select(makeSelectPackage());
    // const page = yield select(makeSelectPage());
    const payload = yield call(
      get,
      `${API_PACKAGE_LIST}/${packageId}/bookings`,
      {},
      myId,
    );
    console.log(payload);
    const booker = yield all(
      payload.content.map(el =>
        call(get, `${API_ORG_DETAIL}`, {}, el.organizerId),
      ),
      // payload.content.map(el => console.log(el.organizerUid)),
    );
    payload.content = payload.content.map((p, index) => ({
      ...p,
      booker: booker[index],
    }));
    console.log(payload);
    yield put(loadInfoSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_PACKAGES, getData);
  // yield takeEvery(LOAD_BOOKING_PACKAGES, getBookingData);
}
