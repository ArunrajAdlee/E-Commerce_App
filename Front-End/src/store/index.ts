import React from 'react';
import { ILoginFields } from '../components/Login/login';

export interface IUserInfo {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  brand_name: string;
}

export const store = {
  userInfo: {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    brand_name: '',
  },
  isAuth: false,
  setAuthState: (isAuth: boolean, userInfo: IUserInfo) => {},
  login: (userCredentials: ILoginFields) => {},
  logout: () => {},
};

export const StoreContext = React.createContext(store);
