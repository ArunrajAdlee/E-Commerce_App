import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';

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
		var total_price_before_tax = 0;
		var total_fee = 0;
		for (let cartItem of cartItems) {
			total_price_before_tax += Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100;
			total_fee += Math.round(cartItem.listing.price * this.listingFeeRate * 100) / 100;
		}
		var total_tax = Math.round(total_price_before_tax * this.taxRate * 100) / 100;
		var total_price = Math.round(total_price_before_tax * (1 + this.taxRate) * 100) / 100;

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
			var newOrder: OrderModel = {
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
			var order = await this.orderRepository.save(newOrder);
			if(!order) {
				res.status(404).send("error creating order");
				return;
			}

			//Create order details for each cart item
			var total_price_before_tax = 0;
			var total_fee = 0;
			var newOrderDetails: OrderDetailsModel;
			for (let cartItem of cartItems) {
				//Determine listing fee
				var itemsSold = await this.countItemsSold(cartItem.listing.user_id);
				var appliedFeeRate = this.listingFeeRate;
				if(itemsSold <= this.reducedFeeItemLimit) {
					appliedFeeRate = this.reducedListingFeeRate;
				}

				//Create order detail	
				newOrderDetails = {
					order_id: order.id,
					listing_id: cartItem.listing_id,
					seller_id: cartItem.listing.user_id,
					purchase_date: new Date(),
					quantity: cartItem.quantity,
					price_before_tax: Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100,
					tax: Math.round(cartItem.listing.price * cartItem.quantity * this.taxRate * 100) / 100,
					listing_fee: Math.round(cartItem.listing.price * appliedFeeRate * 100) / 100,
					price_after_tax: Math.round(cartItem.listing.price * (1 + this.taxRate) * 100) / 100,
				};
				await this.orderDetailsRepository.save(newOrderDetails);
				total_price_before_tax += cartItem.listing.price; //Compute order's total price before tax
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

	async countItemsSold(userID: number) {
		const quantity_sold = await this.listingsRepository
			.createQueryBuilder('listings')
			.select("SUM(quantity_sold)", "sum")
			.where("user_id = " +  userID)
			.getRawOne();
		
		return  quantity_sold.sum;
	}
}
