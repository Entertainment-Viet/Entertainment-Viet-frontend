import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_LIST_EVENTS,
  API_EVENT_DETAIL,
  API_EVENT_POSITIONS,
  API_GET_CATEGORIES,
  API_EVENT_POSITION_DETAIL,
  API_EVENT_POSITIONS_BOOKINGS,
  API_GET_LOCATION,
} from 'constants/api';
import { ENUM_CURRENCY } from 'constants/enums';

import {
  LOAD_EVENTS,
  LOAD_EVENT,
  LOAD_CATEGORIES,
  CHANGE_CATEGORY_EVENT,
  CHANGE_OWN_EVENT_PRICE_RANGE,
  CHANGE_START,
  CHANGE_END,
  CHANGE_CITY,
  CHANGE_DISTRICT,
  LOAD_LOCATION,
} from './constants';
import {
  loadEventsInfoSuccess,
  loadEventInfoError,
  loadEventInfoSuccess,
  loadDataError,
  loadCategoriesSuccess,
  loadLocationSuccess,
} from './actions';
import {
  makeSelectLimit,
  makeSelectMode,
  makeSelectEnd,
  makeSelectStart,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectCategory,
  makeSelectPage,
  makeSelectCity,
  makeSelectDistrict,
} from './selectors';
const USER_ID = localStorage.getItem('uid');

export function* getEventData(id) {
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_LIST_EVENTS, { page, size }, USER_ID);
    } else if (mode === 1) {
      // const eventId = yield select(makeSelectEvent());
      if (id.eventId)
        payload = yield call(
          get,
          API_EVENT_POSITIONS,
          { page, size },
          USER_ID,
          id.eventId,
        );
    } else if (mode === 2) {
      // const eventId = yield select(makeSelectEvent());
      if (id.eventId && id.positionId)
        payload = yield call(
          get,
          API_EVENT_POSITIONS_BOOKINGS,
          { page, size },
          USER_ID,
          id.eventId,
          id.positionId,
        );
    }
    // console.log('payload: ', payload.paging, payload);
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

export function* getCategories() {
  try {
    const payload = yield call(get, API_GET_CATEGORIES, {});
    yield put(loadCategoriesSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getEventByTime() {
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  try {
    const payload = yield call(
      get,
      API_LIST_EVENTS,
      {
        startTime: start,
        endTime: end,
      },
      USER_ID,
    );

    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getCategoriesByChanging() {
  try {
    const category = yield select(makeSelectCategory());
    const payload = yield call(get, API_LIST_EVENTS, { category }, USER_ID);
    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getPriceRange() {
  try {
    const currency = ENUM_CURRENCY.VND;
    const maxPrice = yield select(makeSelectPriceMax());
    const minPrice = yield select(makeSelectPriceMin());
    const payload = yield call(
      get,
      API_LIST_EVENTS,
      {
        currency,
        maxPrice,
        minPrice,
      },
      USER_ID,
    );
    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getLocation() {
  try {
    const payload = yield call(get, API_GET_LOCATION, {});
    yield put(loadLocationSuccess(payload.content));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getLocationChange() {
  try {
    const cityName = yield select(makeSelectCity());
    const districtName = yield select(makeSelectDistrict());
    const payload = yield call(
      get,
      API_LIST_EVENTS,
      {
        locationParentName: cityName,
        name: districtName,
      },
      USER_ID,
    );
    yield put(loadEventsInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_EVENTS, getEventData);
  yield takeEvery(LOAD_EVENT, getEventDetail);
  yield takeEvery(CHANGE_CATEGORY_EVENT, getCategoriesByChanging);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  yield takeEvery(CHANGE_OWN_EVENT_PRICE_RANGE, getPriceRange);
  yield takeEvery(CHANGE_START, getEventByTime);
  yield takeEvery(CHANGE_END, getEventByTime);
  yield takeEvery(LOAD_LOCATION, getLocation);
  yield takeEvery(CHANGE_CITY, getLocationChange);
  yield takeEvery(CHANGE_DISTRICT, getLocationChange);
}
