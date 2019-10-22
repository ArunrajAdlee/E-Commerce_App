import React from 'react';
import { ILoginFields } from '../components/Login/login';

export const store = {
  userToken: '',
  isAuth: false,
  login: (self:any, userCredentials: ILoginFields) => {},
  logout: () => {},
};

export const StoreContext = React.createContext(store);
