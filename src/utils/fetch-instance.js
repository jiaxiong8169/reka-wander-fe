export const post = (urlPath, body) => fetch(`http://10.0.2.2:9000${urlPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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