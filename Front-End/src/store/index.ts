import React from "react";
import { ILoginFields } from "../components/Login/login";

export interface IUserInfo {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  brand_name: string;
  phone_number: string;
  address: number;
  street_name: string;
  street_number: number;
  unit_number: number;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export const store = {
  userInfo: {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    brand_name: "",
    phone_number: "",
    address: 0,
    street_name: "",
    street_number: 0,
    unit_number: 0,
    city: "",
    province: "",
    postal_code: "",
    country: ""
  },
  isAuth: false,
  setAuthState: (isAuth: boolean, userInfo: IUserInfo) => {},
  login: (userCredentials: ILoginFields) => {},
  logout: () => {}
};

export const StoreContext = React.createContext(store);
