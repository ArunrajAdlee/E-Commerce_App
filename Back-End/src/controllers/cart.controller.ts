import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { CartModel } from '../models/cart.model';
import { ListingsModel } from '../models/listings.model';
import { Cart } from "../entity/cart.entity";
import { Listings } from '../entity/listings.entity';

export class CartController {

    private cartRepository = getRepository(Cart);
    private listingRepository = getRepository(Listings);

    async getCart(req: Request, res: Response, next: NextFunction) {
        const user_id: number = +(req.params.user_id);
        const desiredCarts: CartModel[] = await this.cartRepository.find({user_id: user_id});
        if(!desiredCarts) {
            res.status(404).send('cart not found');
            return;
        }
        
        const cartListings: ListingsModel[] = [];

        for(var cart of desiredCarts) {
            cartListings.push(await this.listingRepository.findOne({
                id : cart.listing_id
            }));
        }

        return cartListings;
    }

    
}