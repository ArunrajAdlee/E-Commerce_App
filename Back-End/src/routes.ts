import { UserController } from './controllers/user.controller';
import { ListingsController } from './controllers/listings.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { SearchController } from './controllers/search.controller'
export const Routes = [
	{
		method: 'get',
		route: '/users',
		controller: UserController,
		action: 'all'
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
		route: '/listings/category/:category',
		controller: ListingsController,
		action: 'allWithCategory'
	},
	{
		method: 'get',
		route: '/listings/active',
		controller: ListingsController,
		action: 'getActive'
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

	//Categories
	{
		method: 'get',
		route: '/categories',
		controller: CategoriesController,
		action: 'all'
	},

	//Search
	{
		method: 'get',
		route: '/search/:searchQuery',
		controller: SearchController,
		action: 'all'
	}
];
