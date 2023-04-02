/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_DATA = 'App/Global/LOAD_DATA';
export const LOAD_ERROR = 'App/Global/LOAD_ERROR';
export const LOAD_SUCCESS = 'App/Global/LOAD_SUCCESS';
export const OPEN_SIDE_BAR = 'App/Global/OPEN_SIDE_BAR ';
