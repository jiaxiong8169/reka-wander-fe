import {BACKEND_URL} from '@env';

export const post = async (urlPath, body, headers = {}) => {
  const res = await fetch(`${BACKEND_URL}/${urlPath}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...headers},
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let err = new Error('HTTP status code: ' + res.status);
    err.response = res;
    err.status = res.status;
    throw err;
  }
  return await res.json();
};

export const get = async urlPath => {
  const res = await fetch(`${BACKEND_URL}/${urlPath}`, {
    method: 'GET',
  });
  if (!res.ok) {
    let err = new Error('HTTP status code: ' + res.status);
    err.response = res;
    err.status = res.status;
    throw err;
  }
  return await res.json();
};
