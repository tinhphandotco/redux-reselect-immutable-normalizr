import axios from 'axios';
import { _store } from 'index';
import { API_URL } from 'config';
import { getLoggedToken } from 'redux/reducers/auth/selector';

const debugData = response => {
  return Promise.resolve(response);
};

const debugError = er => {
  return Promise.reject(er.response);
};

const request = () => {
  // TEST TOKEN: '1153c118dc277605a676a2f5b4adef9bc71f1413'
  const token = getLoggedToken(_store.getState());

  const axiosApi = axios.create({
    baseURL: API_URL,
    headers: token ? {
      Authorization: `Token ${token}`
    } : {}
  });

  return {
    get(url, params, options = {}) {
      return axiosApi.get(url, { params }, options).then(debugData).catch(debugError);
    },
    post(url, data, options = {}) {
      return axiosApi.post(url, data, options).then(debugData).catch(debugError);
    },
    put(url, data, options = {}) {
      return axiosApi.put(url, data, options).then(debugData).catch(debugError);
    },
    delete(url, options = {}) {
      return axiosApi.delete(url, options).then(debugData).catch(debugError);
    },
  };
};

export default request;