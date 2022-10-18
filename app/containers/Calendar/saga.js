/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_BOOKING, API_CREATE_BOOKING } from 'constants/api';
import { ENUM_BOOKING_STATUS } from 'constants/enums';
import { LOAD_INFO } from './constants';
import { loadInfoSuccess, loadInfoError } from './actions';
import {} from './selectors';

export function* getData(data) {
  try {
    // const role = localStorage.getItem('role');
    if (data.roles === 'talent') {
      // const talentId = localStorage.getItem('uid');
      const payload = yield call(
        get,
        `${API_TALENT_BOOKING}`,
        { size: 200, status: ENUM_BOOKING_STATUS.CONFIRMED },
        data.uid,
      );
      yield put(loadInfoSuccess(payload.bookings));
    } else if (data.roles === 'organizer') {
      // const talentId = localStorage.getItem('uid');
      const payload = yield call(
        get,
        `${API_CREATE_BOOKING}`,
        { size: 200, status: ENUM_BOOKING_STATUS.CONFIRMED },
        data.uid,
      );
      yield put(loadInfoSuccess(payload.bookings));
    }
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_INFO, getData);
}
