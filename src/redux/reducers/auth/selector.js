import { pathOr } from 'ramda';
// import { createSelector } from 'reselect';

export const getLoggedToken = store => pathOr(null, ['auth', 'token'], store)