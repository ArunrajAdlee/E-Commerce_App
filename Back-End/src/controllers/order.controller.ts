import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Cart} from '../entity/cart.entity';
import {Listings} from '../entity/listings.entity';
import {Order} from '../entity/order.entity';
import {OrderDetails} from '../entity/orderDetails.entity';
import {CartModel} from '../models/cart.model';
import {ListingsModel} from '../models/listings.model';
import {OrderModel} from '../models/order.model';
import {OrderDetailsModel} from '../models/orderDetails.model';

export class OrderController {
	private cartRepository = getRepository(Cart);
	private listingsRepository = getRepository(Listings);
	private orderDetailsRepository = getRepository(OrderDetails);
	private orderRepository = getRepository(Order);
	private taxRate = 0.15; //TODO: CONFIRM TAX RATE = 15%
	private listingFee = 0; //TODO: WHAT IS LISTING FEE?
	private defaultShippingStatus = "TEMPORARY"; //TODO: WHAT IS DEFAULT SHIPPING STATUS?

	//TODO: MOVE THIS TO CART CONTROLLER AS getCartTotals MAYBE???
	async getOrderTotals(req: Request, res: Response, next: NextFunction) {
		const requestedUser: number = parseInt(req.params.userID);
		const cartItems = await this.cartRepository.find({ user_id: requestedUser });

		var total_price_before_tax = 0;
		var total_fee = 0;
		var listing;
		for (let cartItem of cartItems) {
			listing = await this.listingsRepository.findOne(cartItem.listing_id);
			total_price_before_tax += Math.round(listing.price * cartItem.quantity * 100) / 100;
			total_fee += this.listingFee;
		}
		var total_tax = Math.round(total_price_before_tax * this.taxRate * 100) / 100;
		var total_price = Math.round(total_price_before_tax * (1 + this.taxRate) * 100) / 100;

		res.status(200).send({
			total_price_before_tax: total_price_before_tax,
			total_tax: total_tax,
			total_fee: total_fee,
			total_price: total_price
		});
	}

	async save(req: Request, res: Response, next: NextFunction) {
		const requestedUser: number = parseInt(req.body.userID);
		const cartItems = await this.cartRepository.find({ user_id: requestedUser });

		//Create order
		var newOrder: OrderModel = {
			date: new Date(),
			shipping_type: req.body.shippingType = "TEST", //FOR EASY TESTING (REMOVE LATER)
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
		var listing;
		var newOrderDetails: OrderDetailsModel;
		for (let cartItem of cartItems) {
			listing = await this.listingsRepository.findOne(cartItem.listing_id);
			
			newOrderDetails = {
				order_id: order.id,
				buyer_id: requestedUser,
				listing_id: cartItem.listing_id,
				seller_id: listing.user_id,
				purchase_date: new Date(),
				quantity: cartItem.quantity,
				price_before_tax: Math.round(listing.price * cartItem.quantity * 100) / 100,
				tax: Math.round(listing.price * cartItem.quantity * this.taxRate * 100) / 100,
				listing_fee: this.listingFee,
				price_after_tax: Math.round(listing.price * (1 + this.taxRate) * 100) / 100,
			};
			await this.orderDetailsRepository.save(newOrderDetails);
			total_price_before_tax += listing.price;
			total_fee += this.listingFee;

			listing.stock_count -= cartItem.quantity;
			if(listing.stock_count <= 0) {
				listing.stock_count = 0;
				listing.status = false;
			}
			await this.listingsRepository.save(listing); //Update listing stock_count and status
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
