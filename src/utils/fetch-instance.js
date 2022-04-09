export const post = (urlPath, body, headers = {}) => fetch(`http://10.0.2.2:9000${urlPath}`, {
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

export const getWithAuth = (urlPath, token, disableRetry, unauthorizedAction, authData) => {
    const access_token = authData?.token?.access_token;
    const refresh_token = authData?.token?.refresh_token;
    if (!token) token = access_token;
    return fetch(`http://10.0.2.2:9000${urlPath}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    if (!disableRetry)
                        return refreshAccessToken(refresh_token)
                            .then(() => getWithAuth(urlPath, undefined, true, unauthorizedAction, authData))
                            .catch((err) => { unauthorizedAction(); throw err; });
                    else if (unauthorizedAction) {
                        return unauthorizedAction();
                    }
                }
                let err = new Error("HTTP status code: " + res.status)
                err.response = res
                err.status = res.status
                throw err
            }
            return res;
        })
        .then(res => res.json())
}

export const getWithoutAuth = (urlPath) => fetch(`http://10.0.2.2:9000${urlPath}`, {
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

export const refreshAccessToken = (refreshToken) => {
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
            console.log("refresh status" + res.status);
            if (!res.ok) {
                let err = new Error("HTTP status code: " + res.status)
                err.response = res
                err.status = res.status
                throw err
            }
            return res;
        })
        .then(res => res.json())
        .then()
}