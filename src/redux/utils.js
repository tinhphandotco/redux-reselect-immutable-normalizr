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

export const requestAction = (
  action,
  apiCall,
  normalizePayload = defaultNormalizePayload,
  normalizeError = defaultNormalizeError
) => (x = {}) => (dispatch, getState) => {
  const params = isFunction(x) ? x(getState) : x;
  dispatch(createRequestPending(action));

  return apiCall(params).then(res => {
    dispatch(createRequestSuccess(action, normalizePayload(res)));
    return Promise.resolve(normalizePayload(res));
  }).catch(err => {
    dispatch(createRequestFailure(action, normalizeError(err)));
    return Promise.reject(normalizeError(err));
  });
};
