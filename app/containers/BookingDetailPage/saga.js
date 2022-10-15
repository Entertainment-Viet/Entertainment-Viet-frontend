/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_GET_BOOKING_TALENT_INFO,
  API_TALENT_DETAIL,
  API_ORG_DETAIL,
  API_GET_BOOKING_ORG_INFO,
} from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';

export function* getData(id) {
  // const id = yield select(makeSelectId());
  console.log('id: ', id);
  const role = window.localStorage.getItem('role');
  try {
    let payload;
    if (role === 'talent')
      payload = yield call(
        get,
        API_GET_BOOKING_TALENT_INFO,
        {},
        id.talentId,
        id.id,
      );
    else if (role === 'organizer') {
      payload = yield call(
        get,
        API_GET_BOOKING_ORG_INFO,
        {},
        id.talentId,
        id.id,
      );
    }
    const talent = yield call(get, API_TALENT_DETAIL, {}, id.talentId);
    const org = yield call(get, API_ORG_DETAIL, {}, payload.organizerUid);
    payload.talent = talent;
    payload.org = org;
    yield put(loadDataSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
