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
        
        try {
            const savedListing = await this.listingsRepository.save(newProduct);
            if (savedListing) {
                response.status(200).send({
                    message: 'successfully saved',
                    savedListing
                });
                return;
            }
            response.status(404).send({message: 'failed to save'});
        } catch (error) {
            response.status(404).send({message: 'failed to save'});
        }

        // return this.listingsRepository.save(newProduct);
    }

} 