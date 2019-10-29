import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Listings } from '../entity/listings.entity';

export class SearchController {
    private listingsRepository = getRepository(Listings);

    async all(req: Request, res: Response, next: NextFunction) {
        const requestedListings: string = req.params.searchQuery;
        return this.listingsRepository.find({
            title: requestedListings
        });
	}
}