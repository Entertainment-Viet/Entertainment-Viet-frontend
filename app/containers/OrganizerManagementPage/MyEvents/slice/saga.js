/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_LIST_EVENTS,
  API_EVENT_DETAIL,
  API_EVENT_POSITIONS,
  API_EVENT_POSITION_DETAIL,
  API_EVENT_POSITIONS_BOOKINGS,
} from 'constants/api';
import { LOAD_EVENTS, LOAD_EVENT } from './constants';
import {
  loadEventsInfoSuccess,
  loadEventInfoError,
  loadEventInfoSuccess,
} from './actions';
import {
  makeSelectLimit,
  makeSelectMode,
  // makeSelectEvent,
  makeSelectPage,
} from './selectors';

export function* getEventData(id) {
  const myId = localStorage.getItem('uid');
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_LIST_EVENTS, { page, size }, myId);
    } else if (mode === 1) {
      // const eventId = yield select(makeSelectEvent());
      if (id.eventId)
        payload = yield call(
          get,
          API_EVENT_POSITIONS,
          { page, size },
          myId,
          id.eventId,
        );
    } else if (mode === 2) {
      // const eventId = yield select(makeSelectEvent());
      if (id.eventId && id.positionId)
        payload = yield call(
          get,
          API_EVENT_POSITIONS_BOOKINGS,
          { page, size },
          myId,
          id.eventId,
          id.positionId,
        );
    }
    console.log('payload: ', payload.paging, payload);
    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadEventInfoError(err));
  }
}

export function* getEventDetail(id) {
  try {
    const mode = yield select(makeSelectMode());
    const orgId = localStorage.getItem('uid');
    if (mode === 1) {
      const payload = yield call(get, API_EVENT_DETAIL, {}, orgId, id.eventId);
      yield put(loadEventInfoSuccess(payload));
    } else {
      const payload = yield call(
        get,
        API_EVENT_POSITION_DETAIL,
        {},
        orgId,
        id.eventId,
        id.positionId,
      );
      yield put(loadEventInfoSuccess(payload));
    }
  } catch (err) {
    yield put(loadEventInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_EVENTS, getEventData);
  yield takeEvery(LOAD_EVENT, getEventDetail);
  // yield takeEvery(LOAD_BOOKING_PACKAGES, getBookingData);
}
