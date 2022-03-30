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

const signUp = (userRegInfo) => {
    return post("/auth/register", userRegInfo)
        .then(data => {
            const { user, tokens } = data.data;
            return {
                ...user,
                token: tokens,
            }
        })
}

export const AuthService = {
    signIn,
    signUp,
}

export default AuthService;