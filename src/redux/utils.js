import { isFunction } from 'utils';

const defaultNormalizePayload = res => res;
const defaultNormalizeError = res => res;

export const getActionTypeByPrefix = prefix => type => `${prefix}.${type}`;

export const actionPending = action => `${action}_PENDING`;
export const actionSuccess = action => `${action}_SUCCESS`;
export const actionFailure = action => `${action}_FAILURE`;

export const createRequestPending = (action) => ({ type: actionPending(action) });
export const createRequestSuccess = (action, payload) => ({ type: actionSuccess(action), payload });
export const createRequestFailure = (action, errors) => ({ type: actionFailure(action), payload: errors });

export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const requestAction = (
  action,
  apiCall,
  normalizePayload = defaultNormalizePayload,
  normalizeError = defaultNormalizeError
) => (x = {}) => (dispatch, getState) => {
  const params = isFunction(x) ? x(getState) : x;
  dispatch(createRequestPending(action));

  return apiCall(params).then(res => {
    const payload = normalizePayload(res);
    dispatch(createRequestSuccess(action, payload));
    return Promise.resolve(payload);
  }).catch(err => {
    const errors = normalizeError(err);
    dispatch(createRequestFailure(action, errors));
    return Promise.reject(errors);
  });
};
