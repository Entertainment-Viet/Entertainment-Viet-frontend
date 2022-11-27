import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { get } from 'utils/request';
import {
  API_PACKAGE_LIST,
  API_ORG_DETAIL,
  API_GET_PACKAGE_INFO,
  API_GET_CATEGORIES,
  API_GET_LOCATION,
} from 'constants/api';
import { ENUM_CURRENCY } from 'constants/enums';

import {
  LOAD_PACKAGES,
  LOAD_PACKAGE,
  CHANGE_OWN_PACKAGE_PRICE_RANGE,
  CHANGE_START,
  CHANGE_END,
  CHANGE_CATEGORY_PACKAGE,
  LOAD_CATEGORIES,
  LOAD_LOCATION,
  CHANGE_CITY,
  CHANGE_DISTRICT,
} from './constants';
import {
  loadInfoSuccess,
  loadInfoError,
  loadPackageInfoSuccess,
  loadCategoriesSuccess,
  loadDataError,
  loadLocationSuccess,
} from './actions';
import {
  makeSelectLimit,
  makeSelectMode,
  makeSelectPackage,
  makeSelectPage,
  makeSelectEnd,
  makeSelectStart,
  makeSelectPriceMax,
  makeSelectPriceMin,
  makeSelectCategory,
  makeSelectCity,
  makeSelectDistrict,
} from './selectors';

const USER_ID = localStorage.getItem('uid');

export function* getPackageData() {
  try {
    // const page = yield select(makeSelectPage());
    const mode = yield select(makeSelectMode());
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    let payload;
    if (mode === 0) {
      payload = yield call(get, API_PACKAGE_LIST, { page, size }, USER_ID);
    } else {
      const packageId = yield select(makeSelectPackage());
      // const page = yield select(makeSelectPage());
      payload = yield call(
        get,
        `${API_PACKAGE_LIST}/${packageId}/bookings`,
        { page, size },
        USER_ID,
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
      API_PACKAGE_LIST,
      {
        startTime: start,
        endTime: end,
      },
      USER_ID,
    );
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getCategoriesByChanging() {
  try {
    const category = yield select(makeSelectCategory());
    const payload = yield call(get, API_PACKAGE_LIST, { category }, USER_ID);
    yield put(loadInfoSuccess(payload.content, payload.paging));
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
      API_PACKAGE_LIST,
      {
        currency,
        minPrice,
        maxPrice,
      },
      USER_ID,
    );
    yield put(loadInfoSuccess(payload.content, payload.paging));
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
      API_PACKAGE_LIST,
      {
        locationParentName: cityName,
        name: districtName,
      },
      USER_ID,
    );
    yield put(loadInfoSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_PACKAGES, getPackageData);
  yield takeEvery(LOAD_PACKAGE, getPackageDetail);
  yield takeEvery(CHANGE_CATEGORY_PACKAGE, getCategoriesByChanging);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  yield takeEvery(CHANGE_OWN_PACKAGE_PRICE_RANGE, getPriceRange);
  yield takeEvery(CHANGE_START, getEventByTime);
  yield takeEvery(CHANGE_END, getEventByTime);
  yield takeEvery(LOAD_LOCATION, getLocation);
  yield takeEvery(CHANGE_CITY, getLocationChange);
  yield takeEvery(CHANGE_DISTRICT, getLocationChange);
}
