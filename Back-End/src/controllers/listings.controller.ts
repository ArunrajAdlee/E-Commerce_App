import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Listings } from '../entity/listings.entity';
import { AuthModel } from '../models/auth.model';
import { ListingsModel } from '../models/listings.model';
// tslint:disable-next-line
const { checkAuth } = require('../helpers/check-auth');

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
		const activeListings = await this.listingsRepository.find({ status: true });

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
		};
		return this.listingsRepository.save(newProduct);
	}

	async allWithCategory(req: Request, res: Response, next: NextFunction) {
		const requestedCategory: number = parseInt(req.params.category);
		return this.listingsRepository.find({ category: requestedCategory });
	}

	async allWithSearchQuery(req: Request, res: Response, next: NextFunction) {
        const query = req.params.searchQuery.replace('+', ' ');
		const allListings: ListingsModel[] = await this.listingsRepository.find();

		const searchListings = allListings.filter(listing => listing.title.includes(query));
	
		res.status(200).send({
			listings: searchListings
		});
    }
}
