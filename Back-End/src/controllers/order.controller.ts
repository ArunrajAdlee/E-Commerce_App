import {NextFunction, Request, Response} from 'express';
import {getRepository, createQueryBuilder} from 'typeorm';

import {Cart} from '../entity/cart.entity';
import {Listings} from '../entity/listings.entity';
import {Order} from '../entity/order.entity';
import {OrderDetails} from '../entity/orderDetails.entity';
import {User} from '../entity/user.entity';

import {AuthModel} from '../models/auth.model';
import {CartModel} from '../models/cart.model';
import {ListingsModel} from '../models/listings.model';
import {OrderModel} from '../models/order.model';
import {OrderDetailsModel} from '../models/orderDetails.model';
import {UserModel} from '../models/user.model';
import { Address } from '../entity/address.entity';

const {checkAuth} = require('../helpers/check-auth');

export class OrderController {
	private cartRepository = getRepository(Cart);
	private listingsRepository = getRepository(Listings);
	private orderRepository = getRepository(Order);
	private orderDetailsRepository = getRepository(OrderDetails);
	private userRepository = getRepository(User);

	private taxRate = 0.15;
	private listingFeeRate = 0.08;
	private reducedListingFeeRate = 0.03;
	private reducedFeeItemLimit = 10;
	private defaultShippingStatus = "Processing Order";

	async getOrderSummary(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser: AuthModel = checkAuth(req);
	    if (!authenticatedUser) {
	      res.status(404).send('user is not authenticated');
	      return;
	    }

		//Get user and user address information
		const userInfo = await this.userRepository.findOne(authenticatedUser.id, { relations: ["address"] });

		//Get cart and listing information
		const cartItems = await this.cartRepository.find({ 
			where: { user_id: authenticatedUser.id }, 
			relations: ["listing"] 
		})
		if(!cartItems) {
			res.status(404).send('error retrieving cart');
			return;
		}
	
		//Compute order totals
		let total_price_before_tax = 0;
		let total_fee = 0;
		for (let cartItem of cartItems) {
			total_price_before_tax += Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100;
			total_fee += Math.round(cartItem.listing.price * this.listingFeeRate * 100) / 100;
		}
		const total_tax = Math.round(total_price_before_tax * this.taxRate * 100) / 100;
		const total_price = Math.round(total_price_before_tax * (1 + this.taxRate) * 100) / 100;

		res.status(200).send({
			userInfo: userInfo,
			cartItems: cartItems,
			total_price_before_tax: total_price_before_tax,
			total_tax: total_tax,
			total_fee: total_fee,
			total_price: total_price
		});
	}

	async save(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser: AuthModel = checkAuth(req);
	    if (!authenticatedUser) {
	      res.status(404).send('user is not authenticated');
	      return;
	    }
	    const user = await this.userRepository.findOne(authenticatedUser.id);

		//Get cart and listing information
		const cartItems = await this.cartRepository.find({ 
			where: {user_id: authenticatedUser.id},
			relations: ["listing"] 
		});
		if(cartItems.length == 0) {
			res.status(404).send("no items in cart");
			return;
		}

		//Check if there is sufficient stock for each cart item
		for (let cartItem of cartItems) {
			if(cartItem.quantity > cartItem.listing.stock_count) {
				res.status(404).send({
					message: "error creating order: insufficient stock",
					listing: cartItem.listing,
					quantity: cartItem.quantity 
				});
				return;
			}
		}

		try {
			//Create order
			const newOrder: OrderModel = {
				buyer_id: authenticatedUser.id,
				date: new Date(),
				shipping_type: req.body.shippingType,
				shipped_to: req.body.addressID,
				shipping_status: this.defaultShippingStatus,
				total_price_before_tax: 0,
				total_tax: 0,
				total_price: 0,
				total_fee: 0
			};
			const order = await this.orderRepository.save(newOrder);
			if(!order) {
				res.status(404).send("error creating order");
				return;
			}

			//Create order details for each cart item
			let total_price_before_tax = 0;
			let total_fee = 0;
			for (let cartItem of cartItems) {
				//Determine listing fee
				const itemsSold = await this.countItemsSold(cartItem.listing.user_id);
				let appliedFeeRate = this.listingFeeRate;
				if(itemsSold <= this.reducedFeeItemLimit) {
					appliedFeeRate = this.reducedListingFeeRate;
				}

				//Create order detail	
				const newOrderDetails: OrderDetailsModel = {
					order_id: order.id,
					listing_id: cartItem.listing_id,
					seller_id: cartItem.listing.user_id,
					purchase_date: new Date(),
					quantity: cartItem.quantity,
					price_before_tax: Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100,
					tax: Math.round(cartItem.listing.price * cartItem.quantity * this.taxRate * 100) / 100,
					listing_fee: Math.round(cartItem.listing.price * appliedFeeRate * 100) / 100,
					price_after_tax: Math.round(cartItem.listing.price * cartItem.quantity * (1 + this.taxRate) * 100) / 100,
				};
				await this.orderDetailsRepository.save(newOrderDetails);
				total_price_before_tax += cartItem.listing.price * cartItem.quantity; //Compute order's total price before tax
				total_fee += newOrderDetails.listing_fee //Compute order's total fee

				//Update listing stock and sold
				cartItem.listing.stock_count -= cartItem.quantity;
				cartItem.listing.quantity_sold += cartItem.quantity;
				if(cartItem.listing.stock_count == 0) {
					cartItem.listing.status = false;
				}

				await this.listingsRepository.save(cartItem.listing); //Update listing stock_count and status
				await this.cartRepository.remove(cartItem); //Clear cart items
			}

			//Compute order totals and update order
			order.total_price_before_tax = total_price_before_tax;
			order.total_tax = Math.round(total_price_before_tax * this.taxRate * 100) / 100;
			order.total_fee = total_fee;
			order.total_price = total_price_before_tax + order.total_tax;
			await this.orderRepository.save(order);

			res.status(200).send({
	        	order: order
			});
		}
		catch(e) {
			res.status(404).send("an error has occured");
		}
	}

	async getBuyerOrderHistory(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser: AuthModel = checkAuth(req);
	    if (!authenticatedUser) {
	      res.status(404).send('user is not authenticated');
	      return;
		}
		
		return this.orderRepository.find({buyer_id: authenticatedUser.id});
	}

	async getBuyerOrderDetailsHistory(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser: AuthModel = checkAuth(req);
		if (!authenticatedUser) {
			res.status(404).send('user is not authenticated');
			return;
		}

		const orderId: number = parseInt(req.params.id);
		const orderDetails = await this.orderDetailsRepository
		.createQueryBuilder('order_details')
		.innerJoin(Listings, 'listings', 'listings.id = order_details.listing_id')
		.innerJoin(Order, 'order', 'order.id = order_details.order_id')
		.innerJoin(User, 'user', 'user.id = order.buyer_id')
		.innerJoin(Address, 'address', 'address.id = user.address_id')
		.select(['order_details.order_id', 
		'order_details.listing_id', 
		'order_details.seller_id',
		'order_details.purchase_date',
		'order_details.quantity',
		'order_details.price_before_tax',
		'order_details.price_after_tax',
		'order_details.listing_fee',
		'listings.title',
		'address.id',
		'user.id'])
		.where('order_details.order_id = :orderId', {orderId: orderId})
		.getRawMany();
		if (!orderDetails || orderDetails.length == 0 || orderDetails[0].user_id != authenticatedUser.id) {
			res.status(404).send({
				message: 'an error occured'
			});
			return;
		}

		const address = await getRepository(Address).findOne(orderDetails[0].address_id);
		if (!address) {
			res.status(404).send({
				message: 'an error occured'
			});
			return;
		}

		
		const order = await getRepository(Order)
      	.createQueryBuilder('order')
      	.select(['order.id', 'order.total_price_before_tax', 'order.total_price'])
      	.where('order.id = :id', {id: orderDetails[0].order_details_order_id})
		.getRawMany();
		if (!order) {
			res.status(404).send({
				message: 'an error occured'
			});
			return;
		}  

		res.status(200).send({
			orderDetails: orderDetails,
			address: address,
			order: order
		});
	}

	async getSellerOrderHistory(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser: AuthModel = checkAuth(req);
	    if (!authenticatedUser) {
	      res.status(404).send('user is not authenticated');
	      return;
		}

		const orderDetails = await this.orderDetailsRepository.find({seller_id: authenticatedUser.id});
		
		res.status(200).send({
			order: orderDetails
		})
	}

	async countItemsSold(userID: number) {
		const quantity_sold = await this.listingsRepository
			.createQueryBuilder('listings')
			.select("SUM(quantity_sold)", "sum")
			.where("user_id = " +  userID)
			.getRawOne();
		
		return  quantity_sold.sum;
	}
}
