import {BACKEND_URL} from '@env';

export const post = (urlPath, body, headers = {}) => {
  // separator between backend url and url path is passed in from url path
  // e.g. urlPath is /auth/login
  return fetch(`${BACKEND_URL}${urlPath}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...headers},
    body: JSON.stringify(body),
  })
    .then(res => {
      if (!res.ok) {
        let err = new Error('HTTP status code: ' + res.status);
        err.response = res;
        err.status = res.status;
        throw err;
      }
      return res;
    })
    .then(res => res.json());
};

export const get = urlPath => {
  // separator between backend url and url path is passed in from url path
  // e.g. urlPath is /auth/login
  return fetch(`${BACKEND_URL}${urlPath}`, {
    method: 'GET',
  })
    .then(res => {
      if (!res.ok) {
        let err = new Error('HTTP status code: ' + res.status);
        err.response = res;
        err.status = res.status;
        throw err;
      }
      return res;
    })
    .then(res => res.json());
};
