import axios from 'axios';

export const server = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 0,
  withCredentials: true,
});

export const api = {
  ads: '/ads',
  admin_activity: '/admin/activity',
  address_create: '/address/create',
  auth_create: '/auth/create',
  auth_status: '/auth/status',
  auth_login: '/auth/login',
  auth_forgotPassword: '/auth/forgotPassword',
  auth_resetPassword: '/auth/resetPassword',
  auth_checkResetPassword: '/auth/checkResetToken',
  auth_logout: '/auth/logout',
  cart: '/cart',
  categories: '/categories',
  listings: '/listings',
  listings_category: '/listings/category/',
  listings_search: '/listings/search/',
  listings_details: '/listings/',
  user_profile: '/users',
  order_summary: '/order/summary',
  order_create: '/order/create',
  order_history_buyer: '/order/history/buyer',
  order_history_seller: '/order/history/seller',
  reviews: '/reviews/',
  reviews_post: '/reviews',
  order_details: '/order/history/buyer/',
};
