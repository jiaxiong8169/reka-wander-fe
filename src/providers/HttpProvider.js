import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const HttpContext = createContext({});
const HttpProvider = ({ children }) => {
    const { authData, setAuthData, setAuthError, signOut } = useAuth();

    const post = (urlPath, body, headers = {}) => fetch(`http://10.0.2.2:9000${urlPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) {
                let err = new Error("HTTP status code: " + res.status)
                err.response = res
                err.status = res.status
                throw err
            }
            return res;
        })
        .then(res => res.json())

    const getWithAuth = (urlPath, token, disableRetry, unauthorizedAction) => {
        const access_token = authData?.token?.access_token;
        const refresh_token = authData?.token?.refresh_token;
        if (!token) token = access_token;
        return fetch(`http://10.0.2.2:9000${urlPath}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        if (disableRetry && unauthorizedAction) {
                            unauthorizedAction();
                        }
                    }
                    let err = new Error("HTTP status code: " + res.status)
                    err.response = res
                    err.status = res.status
                    throw err
                }
                return res;
            })
            .then(res => {
                if (res) return res.json()
            })
            .catch((err) => {
                const { status } = err;
                if (status === 401)
                    return refreshAccessToken(refresh_token)
                        .then((access_token) => {
                            return getWithAuth(urlPath, access_token, true, unauthorizedAction);
                        })
                        .catch((err) => { signOut(); unauthorizedAction(); throw err; });
                throw err;
            })
            .catch((err) => {
                err.response.json().then(data => setAuthError(data.message))
            })
    }

    const getWithoutAuth = (urlPath) => fetch(`http://10.0.2.2:9000${urlPath}`, {
        method: 'GET',
    })
        .then(res => {
            if (!res.ok) {
                let err = new Error("HTTP status code: " + res.status)
                err.response = res
                err.status = res.status
                throw err
            }
            return res;
        })
        .then(res => res.json())

    const refreshAccessToken = (refreshToken) => {
        console.log("refresh");
        return fetch(`http://10.0.2.2:9000/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { refresh_token: refreshToken, }
            )
        })
            .then(res => {
                if (!res.ok) {
                    let err = new Error("HTTP status code: " + res.status)
                    err.response = res
                    err.status = res.status
                    throw err
                }
                return res;
            })
            .then(res => res.json())
            .then(data => data.data)
            .then(({ access_token }) => {
                setAuthData((authData) => ({ ...authData, token: { ...authData.token, access_token } }))
                return access_token
            })
    }

    return (
        <HttpContext.Provider value={{ post, getWithAuth, getWithoutAuth }}>
            {children}
        </HttpContext.Provider>
    )
}

export default HttpProvider;