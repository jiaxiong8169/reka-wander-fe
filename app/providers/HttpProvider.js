import React, {createContext} from 'react';
import {useAuth} from '../hooks/useAuth';
import {BACKEND_URL} from '@env';

export const HttpContext = createContext({});
const HttpProvider = ({children}) => {
  const {authData, setAuthData, setAuthError, signOut} = useAuth();

  const fetchWithAuth = (
    urlPath,
    method,
    body,
    unauthorizedAction,
    token,
    disableRetry,
  ) => {
    const access_token = authData?.token?.access_token;
    const refresh_token = authData?.token?.refresh_token;
    if (!token) token = access_token;
    return fetch(`${BACKEND_URL}/${urlPath}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            if (disableRetry && unauthorizedAction) {
              unauthorizedAction();
            }
          }
          let err = new Error('HTTP status code: ' + res.status);
          err.response = res;
          err.status = res.status;
          throw err;
        }
        return res;
      })
      .then(res => {
        if (res) return res.json();
      })
      .catch(err => {
        const {status, message} = err;
        console.log({message});
        if (status === 401)
          return refreshAccessToken(refresh_token)
            .then(access_token => {
              return fetchWithAuth(
                urlPath,
                method,
                body,
                unauthorizedAction,
                access_token,
                true,
              );
            })
            .catch(err => {
              signOut();
              unauthorizedAction();
              throw err;
            });
        throw err;
      })
      .catch(err => {
        console.log(err);
        err.response.json().then(data => setAuthError(data.message));
      });
  };

  const fetchWithoutAuth = (urlPath, method, body) => {
    return fetch(`${BACKEND_URL}/${urlPath}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
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

  const postWithoutAuth = (urlPath, body) =>
    fetchWithoutAuth(urlPath, 'POST', body);

  const postWithAuth = (urlPath, body, unauthorizedAction) =>
    fetchWithAuth(urlPath, 'POST', body, unauthorizedAction);

  const getWithAuth = (urlPath, unauthorizedAction) =>
    fetchWithAuth(urlPath, 'GET', undefined, unauthorizedAction);

  const getWithoutAuth = urlPath => fetchWithoutAuth(urlPath, 'GET');

  const putWithAuth = (urlPath, body, unauthorizedAction) =>
    fetchWithAuth(urlPath, 'PUT', body, unauthorizedAction);

  const refreshAccessToken = refreshToken => {
    return fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refresh_token: refreshToken}),
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
      .then(res => res.json())
      .then(data => data.data)
      .then(({access_token}) => {
        setAuthData(authData => ({
          ...authData,
          token: {...authData.token, access_token},
        }));
        return access_token;
      });
  };

  return (
    <HttpContext.Provider
      value={{postWithAuth, postWithoutAuth, getWithAuth, getWithoutAuth, putWithAuth}}>
      {children}
    </HttpContext.Provider>
  );
};

export default HttpProvider;
