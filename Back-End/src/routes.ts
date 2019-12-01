import { UserController } from './controllers/user.controller';
import { ListingsController } from './controllers/listings.controller';
import { AddressController } from './controllers/address.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrderController } from './controllers/order.controller';
import { AdsController } from './controllers/ads.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { AdminController } from './controllers/admin.controller';
import { CartController } from './controllers/cart.controller'; 
export const Routes = [
  //User
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'editUserInfo'
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

  //Address
  {
    method: 'post',
    route: '/address/create',
    controller: AddressController,
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
    method: 'get',
    route: '/auth/checkResetToken',
    controller: AuthController,
    action: 'checkResetToken'
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
    method: 'post',
    route: '/auth/forgotPassword',
    controller: AuthController,
    action: 'forgotPassword'
  },
  {
    method: 'post',
    route: '/auth/resetPassword',
    controller: AuthController,
    action: 'resetPassword'
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

  //Order
  {
    method: 'get',
    route: '/order/summary',
    controller: OrderController,
    action: 'getOrderSummary'
  },
  {
    method: 'post',
    route: '/order/create',
    controller: OrderController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/order/history/buyer/:id',
    controller: OrderController,
    action: 'getBuyerOrderDetailsHistory'
  },
  {
    method: 'get',
    route: '/order/history/buyer',
    controller: OrderController,
    action: 'getBuyerOrderHistory'
  },
  {
    method: 'get',
    route: '/order/history/seller',
    controller: OrderController,
    action: 'getSellerOrderHistory'
  },

  //Reviews
  {
    method: 'post',
    route: '/reviews',
    controller: ReviewsController,
    action: 'saveReviews'
  },

  {
    method: 'get',
    route: '/reviews/:seller_id',
    controller: ReviewsController,
    action: 'getReviews'
  },

  //Ads
  {
    method: 'post',
    route: '/ads/:id',
    controller: AdsController,
    action: 'increaseClickCount'
  },
  {
    method: 'get',
    route: '/ads/:id',
    controller: AdsController,
    action: 'getClickCount'
  },

  //Admin
  {
    method: 'get',
    route: '/admin/listings',
    controller: AdminController,
    action: 'listings'
  },
  {
    method: 'get',
    route: '/admin/activity',
    controller: AdminController,
    action: 'siteActivity'
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
