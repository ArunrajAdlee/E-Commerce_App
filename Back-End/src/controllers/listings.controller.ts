import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Listings} from '../entity/listings.entity';
import {AuthModel} from '../models/auth.model';
import {ListingsModel} from '../models/listings.model';
// tslint:disable-next-line
const {checkAuth} = require('../helpers/check-auth');

export class ListingsController {

    private listingsRepository = getRepository(Listings);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.listingsRepository.find();
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
            category: req.body.category,
        };
        return this.listingsRepository.save(newProduct);
    }

}
