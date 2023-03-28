import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_CREATE_BOOKING } from 'constants/api';
import { LOAD_BOOKINGS } from './constants';
import { loadInfoError, loadBookingsSuccess } from './actions';
import { makeSelectLimit, makeSelectPage } from './selectors';

export function* getBookings(id) {
  const myId = localStorage.getItem('uid');
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const { status, hasFilterStatus, isFilterAll, isFilterUpcoming } = id;
    let payload;
    if (isFilterAll) {
      payload = yield call(
        get,
        API_CREATE_BOOKING,
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
        API_CREATE_BOOKING,
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
        API_CREATE_BOOKING,
        {
          page,
          size,
          startTime: new Date().toISOString(),
          withArchived: false,
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
