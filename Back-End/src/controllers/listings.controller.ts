import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Listings} from "../entity/listings.entity";
import {ListingsModel} from "../models/listings.model"

export class ListingsController {

    private listingsRepository = getRepository(Listings);

    async all(req: Request, res: Response, next: NextFunction) {
        const listings = await this.listingsRepository.find();

        res.status(200).send({
            listings: listings
        });
    }

    //Gets all active listings
    async getActive(req: Request, res: Response, next: NextFunction) {
        const activeListings = await this.listingsRepository.find({ "status": 0 }); //Temporary: Assuming 0 is active

        res.status(200).send({
            listings: activeListings
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const newProduct: ListingsModel = {
            productName: request.body.productName,
            quantity: request.body.quantity,
        }
        return this.listingsRepository.save(newProduct);
    }

}