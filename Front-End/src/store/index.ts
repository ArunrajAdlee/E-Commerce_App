import React from 'react';
import { ILoginFields } from '../components/Login/login';

export const store = {
  currentUser: '',
  isAuth: false,
  setAuthState: (isAuth: boolean, user: string) => {},
  login: (userCredentials: ILoginFields) => {},
  logout: () => {},
};

export const StoreContext = React.createContext(store);
