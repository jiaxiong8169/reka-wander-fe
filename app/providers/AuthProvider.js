import React, {createContext, useEffect, useState} from 'react';
import AuthService from '../services/AuthService';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext({});
const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState();

  const [authError, setAuthError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    if (!!authError)
      setTimeout(() => {
        setAuthError('');
      }, 2000);
  }, [authError]);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await EncryptedStorage.getItem('auth_data');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signUp = async userRegInfo => {
    const {email, password} = userRegInfo;
    setLoading(true);
    return AuthService.signUp(userRegInfo)
      .then(_authData => {
        setLoading(false);
        return true;
      })
      .then(() => signIn(email, password))
      .catch(err => {
        setAuthError(err);
        setLoading(false);
        return false;
      });
  };

  const signIn = async (email, password) => {
    setLoading(true);
    return AuthService.signIn(email, password)
      .then(_authData => {
        setAuthData(_authData);
        EncryptedStorage.setItem('auth_data', JSON.stringify(_authData));
        setLoading(false);
        return _authData;
      })
      .catch(err => {
        setLoading(false);
        setAuthError(err);
      });
  };

  const signInWithGoogle = async (email, idToken) => {
    return AuthService.signInWithGoogle(email, idToken)
      .then(_authData => {
        setAuthData(_authData);
        EncryptedStorage.setItem('auth_data', JSON.stringify(_authData));
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setAuthError(err);
      });
  };

  const signOut = async () => {
    setAuthData(undefined);
    EncryptedStorage.removeItem('auth_data');
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        authError,
        loading,
        signIn,
        signOut,
        signUp,
        setAuthError,
        signInWithGoogle,
        setAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
