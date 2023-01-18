import {
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_EDITORCHOICE_INFO_SUCCESS,
} from './constants';

export function loadInfo() {
  return {
    type: LOAD_INFO,
  };
}
export function loadInfoSuccess(data) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
  };
}
export function loadEditorChoiceInfoSuccess(data) {
  return {
    type: LOAD_EDITORCHOICE_INFO_SUCCESS,
    data,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}
