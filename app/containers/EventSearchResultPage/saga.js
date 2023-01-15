import {
  call,
  put,
  select,
  takeEvery,
  delay,
  takeLatest,
} from 'redux-saga/effects';
import { get } from 'utils/request';
import { ENUM_CURRENCY } from 'constants/enums';

import { API_EVENT_SEARCH, API_GET_LOCATION } from 'constants/api';
import { LOAD_CATEGORIES, LOAD_DATA, LOAD_LOCATION } from './constants';
import {
  loadDataSuccess,
  loadDataError,
  loadCategoriesSuccess,
  loadLocationSuccess,
} from './actions';
import {
  makeSelectPriceMin,
  makeSelectPriceMax,
  makeSelectCategory,
  makeSelectEnd,
  makeSelectPage,
  makeSelectSearch,
  makeSelectStart,
  makeSelectCity,
  makeSelectDistrict,
  makeSelectOrganizer,
} from './selectors';

export function* getData() {
  yield delay(500);
  const page = yield select(makeSelectPage());
  const search = yield select(makeSelectSearch());
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const category = yield select(makeSelectCategory());
  const cityName = yield select(makeSelectCity());
  const organizer = yield select(makeSelectOrganizer());
  const districtName = yield select(makeSelectDistrict());
  const currency = ENUM_CURRENCY.VND;
  const maxPrice = yield select(makeSelectPriceMax());
  const minPrice = yield select(makeSelectPriceMin());
  try {
    const payload = yield call(get, API_EVENT_SEARCH, {
      page: page - 1,
      name: search,
      category,
      startTime: start,
      endTime: end,
      locationId: districtName || cityName,
      currency: minPrice && maxPrice ? currency : null,
      maxPrice,
      minPrice,
      organizer,
    });
    yield put(loadDataSuccess(payload.content, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export function* getCategories() {
  try {
    const payload = yield call(get, 'api/categories', {});
    yield put(loadCategoriesSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
// export function* getCategoriesByChanging() {
//   try {
//     const category = yield select(makeSelectCategory());
//     const payload = yield call(get, API_EVENT_SEARCH, { category });
//     yield put(loadDataSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }
// export function* getPriceRange() {
//   try {
//     const currency = ENUM_CURRENCY.VND;
//     const maxPrice = yield select(makeSelectPriceMax());
//     const minPrice = yield select(makeSelectPriceMin());
//     const payload = yield call(get, API_EVENT_SEARCH, {
//       currency,
//       maxPrice,
//       minPrice,
//     });
//     yield put(loadPriceRangeSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }
export function* getLocation() {
  try {
    const payload = yield call(get, API_GET_LOCATION, {});
    yield put(loadLocationSuccess(payload.content));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
// export function* getLocationChange() {
//   try {
//     const cityName = yield select(makeSelectCity());
//     const districtName = yield select(makeSelectDistrict());
//     const payload = yield call(get, API_EVENT_SEARCH, {
//       locationParentName: cityName,
//       name: districtName,
//     });
//     yield put(loadDataSuccess(payload.content, payload.paging));
//   } catch (err) {
//     yield put(loadDataError(err));
//   }
// }
export default function* watchLatestAction() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeEvery(LOAD_CATEGORIES, getCategories);
  // yield takeEvery(CHANGE_CATEGORY, getCategoriesByChanging);
  // yield takeEvery(CHANGE_EVENT_PRICE_RANGE, getPriceRange);
  yield takeEvery(LOAD_LOCATION, getLocation);
  // yield takeEvery(CHANGE_CITY, getLocationChange);
  // yield takeEvery(CHANGE_DISTRICT, getLocationChange);
}
