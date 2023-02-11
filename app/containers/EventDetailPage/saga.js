/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_EVENT_DETAIL,
  API_EVENT_POSITIONS,
  API_EVENT_POSITION_DETAIL,
  API_ORG_DETAIL,
} from 'constants/api';
import { LOAD_DATA, LOAD_POSITION } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadPositionInfoSuccess,
} from './actions';

export function* getData(id) {
  try {
    const payload = yield call(get, API_EVENT_DETAIL, {}, id.orgId, id.eventId);
    const packages = yield call(
      get,
      API_EVENT_POSITIONS,
      { isActive: true },
      id.orgId,
      id.eventId,
    );
    const org = yield call(get, API_ORG_DETAIL, {}, id.orgId);
    payload.organizer = org;
    yield put(loadDataSuccess(payload, packages));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* getPackage(id) {
  try {
    const payload = yield call(
      get,
      API_EVENT_POSITION_DETAIL,
      {},
      id.orgId,
      id.eventId,
      id.positionId,
    );
    yield put(loadPositionInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
  yield takeEvery(LOAD_POSITION, getPackage);
}
