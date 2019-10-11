import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Listings} from "../entity/listings.entity";
import {ListingsModel} from "../models/listings.model"

export class ListingsController {

    private listingsRepository = getRepository(Listings);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.listingsRepository.find();
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const newProduct: ListingsModel = {
            productName: request.body.productName,
            quantity: request.body.quantity,
        }
        return this.listingsRepository.save(newProduct);
    }

}