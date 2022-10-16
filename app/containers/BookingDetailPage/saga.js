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
  API_PACKAGE_LIST,
} from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';

export function* getData(id) {
  // const id = yield select(makeSelectId());
  console.log('id: ', id);
  const role = window.localStorage.getItem('role');
  try {
    let payload;
    let packageInfo;
    let talent;
    let org;
    if (role === 'talent') {
      payload = yield call(
        get,
        API_GET_BOOKING_TALENT_INFO,
        {},
        id.talentId,
        id.id,
      );
      talent = yield call(get, API_TALENT_DETAIL, {}, id.talentId);
      org = yield call(get, API_ORG_DETAIL, {}, payload.organizerId);
    } else if (role === 'organizer') {
      payload = yield call(
        get,
        API_GET_BOOKING_ORG_INFO,
        {},
        id.talentId,
        id.id,
      );
      talent = yield call(get, API_TALENT_DETAIL, {}, payload.talentId);
      org = yield call(get, API_ORG_DETAIL, {}, id.talentId);
    }
    try {
      packageInfo = yield call(
        get,
        `${API_PACKAGE_LIST}/${payload.packageUid}`,
        {},
        id.talentId,
      );
      payload.package = packageInfo;
    } catch (err) {
      console.log(err);
      payload.package = null;
    }
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
