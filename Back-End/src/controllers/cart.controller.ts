import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { CartModel } from '../models/cart.model';
import { ListingsModel } from '../models/listings.model';
import { Cart } from '../entity/cart.entity';
import { Listings } from '../entity/listings.entity';
import { AuthModel } from '../models/auth.model';
const { checkAuth } = require('../helpers/check-auth');

export class CartController {
  private cartRepository = getRepository(Cart);

  async getCart(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    // Get listings in cart
    const cartItems = await this.cartRepository.find({
      where: { user_id: authenticatedUser.id },
      relations: ["listing"]
    });
    if(!cartItems) {
      res.status(404).send('error retrieving cart');
      return;
    }

    // Compute cart totals
    let total_price_before_tax = 0;
    let total_items = 0;
    for (let cartItem of cartItems) {
      total_price_before_tax += Math.round(cartItem.listing.price * cartItem.quantity * 100) / 100;
      total_items += cartItem.quantity;
    }
    res.status(200).send({
      cartItems: cartItems,
      total_price_before_tax: total_price_before_tax,
      total_items: total_items,
    });
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    const cartItems = await this.cartRepository.find({
      user_id: authenticatedUser.id
    });

    //If listing already exists in cart, update quantity
    for (let cartItem of cartItems) {
      if (cartItem.listing_id == req.body.listing_id) {
        try {
          cartItem.quantity += parseInt(req.body.quantity);
          const updatedCart = await this.cartRepository.save(cartItem);

          res.status(200).send({
            cart: updatedCart
          });
          return;
        } catch (e) {
          res.status(404).send({
            message: 'an error has occured'
          });
          return;
        }
      }
    }

    const listing_id = req.body.listing_id;
    const quantity: number = req.body.quantity;

    const newCart: CartModel = {
      user_id: authenticatedUser.id,
      listing_id: listing_id,
      quantity: quantity
    };

    try {
      const addedCart = await this.cartRepository.save(newCart);
      res.status(200).send({
        cart: addedCart
      });
    } catch (e) {
      res.status(404).send({
        message: 'an error accured'
      });
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    const cartToRemove = await this.cartRepository.findOne({
        id: +(req.params.cart_id)
    });

    const removedCart = await this.cartRepository.remove(cartToRemove);
    if (!removedCart) {
      res.status(404).send("error");
    } else {
      res.status(200).send("successfully deleted");
    }

  }
}
