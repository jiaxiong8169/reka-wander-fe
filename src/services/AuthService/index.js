class AuthService {
    static signIn(email, password) {
        return fetch("http://10.0.2.2:9000/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                const { user, tokens } = data.data;
                return {
                    ...user,
                    token: tokens,
                }
            })
    }
}

export default AuthService;