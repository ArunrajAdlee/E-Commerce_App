import axios from 'axios';

export const server = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
  withCredentials: true,
});

export const api = {
  auth_create: '/auth/create',
  auth_status: '/auth/status',
  auth_login: '/auth/login',
  auth_logout: '/auth/logout',
  categories: '/categories',
  listings: '/listings',
  listings_category: '/listings/category/',
  listings_search: '/listings/search/',
};
