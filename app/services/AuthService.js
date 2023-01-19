import {post} from '../utils/fetch-instance';

const signIn = (email, password) => {
  return post('auth/login', {email, password})
    .then(data => {
      const {user, tokens} = data.data;
      return {
        ...user,
        token: tokens,
      };
    })
    .catch(() => {
      throw 'Invalid email or password';
    });
};

const signInWithGoogle = (email, idToken) => {
  return post(
    'auth/login/google',
    {email},
    {Authorization: `Bearer ${idToken}`},
  )
    .then(data => {
      const {user, tokens} = data.data;
      return {
        ...user,
        token: tokens,
      };
    })
    .catch(err => {
      console.log(err);
      if (err.status === 401) {
        throw 'Hi Newcomer! We need to verify your phone number first to complete the registration.';
      }
      throw 'Invalid Google signin';
    });
};

const signUp = userRegInfo => {
  return post('auth/register', userRegInfo)
    .then(data => {
      const {user} = data.data;
      return user;
    })
    .catch(err => {
      console.log(err);
      throw 'Invalid signup';
    });
};

export const AuthService = {
  signIn,
  signUp,
  signInWithGoogle,
};

export default AuthService;
