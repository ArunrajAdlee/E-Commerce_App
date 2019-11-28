import { UserController } from './controllers/user.controller';
import { ListingsController } from './controllers/listings.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { CartController } from './controllers/cart.controller'; 
export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/listings/active',
    controller: ListingsController,
    action: 'getActive'
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
  },

  //Listings
  {
    method: 'get',
    route: '/listings',
    controller: ListingsController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/listings/:id',
    controller: ListingsController,
    action: 'getListingDetails'
  },
  {
    method: 'get',
    route: '/listings/category/:category',
    controller: ListingsController,
    action: 'allWithCategory'
  },
  {
    method: 'get',
    route: '/listings/search/:searchQuery',
    controller: ListingsController,
    action: 'allWithSearchQuery'
  },

  {
    method: 'post',
    route: '/listings',
    controller: ListingsController,
    action: 'save'
  },

  //Auth
  {
    method: 'get',
    route: '/auth/status',
    controller: AuthController,
    action: 'getAuthStatus'
  },
  {
    method: 'post',
    route: '/auth/create',
    controller: AuthController,
    action: 'createUser'
  },
  {
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    action: 'login'
  },
	{
		method: 'get',
		route: '/auth/status',
		controller: AuthController,
		action: 'getAuthStatus'
	},
	{
		method: 'post',
		route: '/auth/logout',
		controller: AuthController,
		action: 'logout'
  },

  //Categories
  {
    method: 'get',
    route: '/categories',
    controller: CategoriesController,
    action: 'all'
  },

  //Cart
  {
    method: 'get',
    route: '/cart',
    controller: CartController,
    action: 'getCart'
  },
  {
    method: 'post',
    route: '/cart', 
    controller: CartController,
    action: 'addToCart'
  }
  
];
