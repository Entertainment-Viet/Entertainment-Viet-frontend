/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_LIST_EVENTS,
  API_EVENT_DETAIL,
  API_EVENT_APPLICANT,
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
  makeSelectEvent,
  makeSelectPage,
} from './selectors';

export function* getEventData() {
  const myId = localStorage.getItem('uid');
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_LIST_EVENTS, { page, size }, myId);
    } else {
      const eventId = yield select(makeSelectEvent());
      payload = yield call(
        get,
        API_EVENT_APPLICANT,
        { page, size },
        myId,
        eventId,
      );
    }
    console.log(payload);
    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadEventInfoError(err));
  }
}

export function* getEventDetail(id) {
  try {
    const payload = yield call(get, API_EVENT_DETAIL, {}, id.talentId, id.id);
    yield put(loadEventInfoSuccess(payload));
  } catch (err) {
    yield put(loadEventInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_EVENTS, getEventData);
  yield takeEvery(LOAD_EVENT, getEventDetail);
  // yield takeEvery(LOAD_BOOKING_PACKAGES, getBookingData);
}
