import { post } from "../../utils/fetch-instance"

const signIn = (email, password) => {
    return post("/auth/login", { email, password })
        .then(data => {
            const { user, tokens } = data.data;
            return {
                ...user,
                token: tokens,
            }
        })
}

const signInWithGoogle = (email, idToken) => {
    return post("/auth/login/google", { email }, { "Authorization": `Bearer ${idToken}` })
        .then(data => {
            const { user, tokens } = data.data;
            return {
                ...user,
                token: tokens,
            }
        })
}

const signUp = (userRegInfo) => {
    return post("/auth/register", userRegInfo)
        .then(data => {
            const { user } = data.data;
            return user
        })
}

export const AuthService = {
    signIn,
    signUp,
    signInWithGoogle,
}

export default AuthService;