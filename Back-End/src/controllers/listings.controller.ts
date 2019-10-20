import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Listings} from "../entity/listings.entity";
import {ListingsModel} from "../models/listings.model"
import {AuthModel} from "../models/auth.model";
const {checkAuth} = require("../helpers/check-auth");

export class ListingsController {

    private listingsRepository = getRepository(Listings);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.listingsRepository.find();

        const listings = await this.listingsRepository.find();

        res.status(200).send({
            listings: listings
        });
    }

    //Gets all active listings
    async getActive(req: Request, res: Response, next: NextFunction) {
        const activeListings = await this.listingsRepository.find({ "status": true });

        res.status(200).send({
            listings: activeListings
        });
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const authenticatedUser: AuthModel = checkAuth(req);
        if (!authenticatedUser) {
            res.status(404).send('user is not authenticated');
            return;
        }

        const newProduct: ListingsModel = {
            title: req.body.title,
            stock_count: req.body.stock_count,
            category: req.body.category
        }
        return this.listingsRepository.save(newProduct);
    }

}