import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_BOOKING_LIST } from 'constants/api';
import { LOAD_BOOKINGS } from './constants';
import { loadInfoError, loadBookingsSuccess } from './actions';
import { makeSelectLimit, makeSelectPage } from './selectors';

export function* getBookings(id) {
  const myId = window.localStorage.getItem('uid');
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const { status, hasFilterStatus, isFilterAll, isFilterUpcoming } = id;
    let payload;
    if (isFilterAll) {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
        },
        myId,
      );
    }
    if (hasFilterStatus) {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          status,
        },
        myId,
      );
    }
    if (isFilterUpcoming) {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          startTime: new Date().toISOString(),
        },
        myId,
      );
    }
    yield put(loadBookingsSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_BOOKINGS, getBookings);
}
