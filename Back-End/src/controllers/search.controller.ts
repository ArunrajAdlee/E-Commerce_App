import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Listings } from '../entity/listings.entity';

export class SearchController {
    private listingsRepository = getRepository(Listings);

    async all(req: Request, res: Response, next: NextFunction) {
        var queries: Array<string> = req.params.searchQuery.split("+");
        const allListings = await this.listingsRepository.find();
        var requestedListings: Array<Listings>
        for(var listing in allListings) {
            for(var query in queries) {
                if(allListings[listing].title.includes(query)) {
                    requestedListings.push(allListings[listing]);
                }
            }
        }
        return requestedListings;
    }
}