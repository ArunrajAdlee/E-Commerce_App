import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {Cart} from '../entity/cart.entity';
import {Listings} from '../entity/listings.entity';
import {Order} from '../entity/order.entity';
import {OrderDetails} from '../entity/orderDetails.entity';
import {User} from '../entity/user.entity';

import {CartModel} from '../models/cart.model';
import {ListingsModel} from '../models/listings.model';
import {OrderModel} from '../models/order.model';
import {OrderDetailsModel} from '../models/orderDetails.model';
import {UserModel} from '../models/user.model';

export class OrderController {
	private cartRepository = getRepository(Cart);
	private listingsRepository = getRepository(Listings);
	private orderRepository = getRepository(Order);
	private orderDetailsRepository = getRepository(OrderDetails);
	private userRepository = getRepository(User);

	private taxRate = 0.15; //TODO: CONFIRM TAX RATE = 15%
	private listingFee = 0; //TODO: WHAT IS LISTING FEE?
	private defaultShippingStatus = "TEMPORARY"; //TODO: WHAT IS DEFAULT SHIPPING STATUS?

	async getOrderSummary(req: Request, res: Response, next: NextFunction) {
		//Get user and user address information
		const userInfo = await this.userRepository.findOne(req.params.userID, { relations: ["fullAddress"] });
		if(!userInfo) {
			res.status(404).send('user not found');
			return;
		}

		//Get cart and listing information
		const cartItems = await this.cartRepository.find({ 
			where: { user_id: req.params.userID }, 
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
			total_fee += this.listingFee;
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
		//Get cart and listing information
		const cartItems = await this.cartRepository.find({ 
			where: {user_id: req.body.userID},
			relations: ["listing"] 
		});
		if(cartItems.length == 0) {
			res.status(404).send("no items in cart")
			return;
		}

		//Create order
		var newOrder: OrderModel = {
			date: new Date(),
			shipping_type: req.body.shippingType,
			shipped_to: req.body.userID,
			shipping_status: this.defaultShippingStatus,
			total_price_before_tax: 0,
			total_tax: 0,
			total_price: 0,
			total_fee: 0
		};
		var order = await this.orderRepository.save(newOrder);

		//Create order details for each cart item
		var total_price_before_tax = 0;
		var total_fee = 0;
		var newOrderDetails: OrderDetailsModel;
		for (let cartItem of cartItems) {
			newOrderDetails = {
				order_id: order.id,
				buyer_id: req.body.userID,
				listing_id: cartItem.listing_id,
				seller_id: cartItem.listing.user_id,
				purchase_date: new Date(),
				quantity: cartItem.quantity,
				price_before_tax: Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100,
				tax: Math.round(cartItem.listing.price * cartItem.quantity * this.taxRate * 100) / 100,
				listing_fee: this.listingFee,
				price_after_tax: Math.round(cartItem.listing.price * (1 + this.taxRate) * 100) / 100,
			};
			await this.orderDetailsRepository.save(newOrderDetails);
			total_price_before_tax += cartItem.listing.price;
			total_fee += this.listingFee;

			cartItem.listing.stock_count -= cartItem.quantity;
			if(cartItem.listing.stock_count <= 0) {
				cartItem.listing.stock_count = 0;
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
}
