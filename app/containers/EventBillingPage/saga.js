/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { CATEGORY_LOAD } from './constants';
import {} from 'constants/api';
import { loadCategoriesSuccess, loadDataError } from './actions';
import {} from './selectors';

export function* getCategories() {
  try {
    
  } catch (err) {
  }
}

export default function* watchLatestAction() {
  yield takeEvery(CATEGORY_LOAD, getCategories);
}
