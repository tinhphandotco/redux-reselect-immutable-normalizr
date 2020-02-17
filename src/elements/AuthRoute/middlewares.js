const LOGIN_PATH = '/login';

/**
 * {} store
 */
export const userAuth = (store) => new Promise((rs, rj) => {
  setTimeout(() => {
    if (store.auth.loggedInfo.token === 'token') {
      rs();
    } else {
      rj(LOGIN_PATH);
    }
  }, 500);
});