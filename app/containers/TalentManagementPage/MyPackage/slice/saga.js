/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_PACKAGE_LIST,
  API_ORG_DETAIL,
  API_GET_PACKAGE_INFO,
} from 'constants/api';
import { LOAD_PACKAGES, LOAD_PACKAGE } from './constants';
import {
  loadInfoSuccess,
  loadInfoError,
  loadPackageInfoSuccess,
} from './actions';
import {
  makeSelectLimit,
  makeSelectMode,
  makeSelectPackage,
  makeSelectPage,
} from './selectors';

export function* getPackageData() {
  const myId = window.localStorage.getItem('uid');
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_PACKAGE_LIST, { page, size }, myId);
    } else {
      const packageId = yield select(makeSelectPackage());
      // const page = yield select(makeSelectPage());
      payload = yield call(
        get,
        `${API_PACKAGE_LIST}/${packageId}/bookings`,
        { page, size },
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
    console.log(payload);
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export function* getPackageDetail(id) {
  try {
    const payload = yield call(
      get,
      `${API_GET_PACKAGE_INFO}/${id.id}`,
      {},
      id.talentId,
    );
    yield put(loadPackageInfoSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_PACKAGES, getPackageData);
  yield takeEvery(LOAD_PACKAGE, getPackageDetail);
  // yield takeEvery(LOAD_BOOKING_PACKAGES, getBookingData);
}
