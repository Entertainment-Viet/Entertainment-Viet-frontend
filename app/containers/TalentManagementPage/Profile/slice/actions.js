import { LOAD_DATA_ERROR, LOAD_TALENT, LOAD_TALENT_SUCCESS } from './constants';

export function loadTalentInfo(talentId) {
  return {
    type: LOAD_TALENT,
    talentId,
  };
}
export function loadTalentInfoSuccess(payload) {
  return {
    type: LOAD_TALENT_SUCCESS,
    payload,
  };
}

export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
