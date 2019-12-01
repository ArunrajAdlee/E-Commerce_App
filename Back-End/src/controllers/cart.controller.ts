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
  private listingRepository = getRepository(Listings);

  async getCart(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    const desiredCarts: CartModel[] = await this.cartRepository.find({
      user_id: authenticatedUser.id
    });
    if (!desiredCarts) {
      res.status(404).send('cart not found');
      return;
    }

    const cartListings: ListingsModel[] = [];

    for (var cart of desiredCarts) {
      cartListings.push(
        await this.listingRepository.findOne({
          id: cart.listing_id
        })
      );
    }

    return cartListings;
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
}
