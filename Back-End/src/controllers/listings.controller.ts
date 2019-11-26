import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Listings } from '../entity/listings.entity';
import { AuthModel } from '../models/auth.model';
import { ListingsModel } from '../models/listings.model';
import { User } from '../entity/user.entity';
import { Categories } from '../entity/categories.entity';
// tslint:disable-next-line
const { checkAuth } = require('../helpers/check-auth');
// tslint:disable-next-line
const cloudinary = require('cloudinary').v2;

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

  async save(req: Request & { files: any }, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    try {
      //Take the request image and store it on the cloud
      const reqImage = req.files.image;

      const cloudImage = await cloudinary.uploader.upload(
        reqImage.tempFilePath,
        { unique_filename: true, width: 540, height: 580 }
      );
      const imageURL = cloudImage.url;
      //Crop the size of the image for the thumbnail (225 x 225)
      const sizeInputLocation = imageURL.lastIndexOf(
        '/',
        imageURL.lastIndexOf('/') - 1
      );
      const thumbnailURL =
        imageURL.substr(0, sizeInputLocation) +
        '/w_255,h_270' +
        imageURL.substr(sizeInputLocation, imageURL.length - 1);

      const newProduct: ListingsModel = {
        title: req.body.title,
        stock_count: req.body.stock_count,
        category: req.body.category ? req.body.category : 4,
        image: imageURL,
        thumbnail: thumbnailURL,
        price: req.body.price
      };
      const listing = await this.listingsRepository.save(newProduct);
      res.status(200).send({
        listing: listing
      });
    } catch (e) {
      res.status(404).send({
        message: 'an error occured'
      });
    }
  }

  async allWithCategory(req: Request, res: Response, next: NextFunction) {
    const requestedCategory: number = parseInt(req.params.category);
    const listingsWithCategory = await this.listingsRepository.find({
      category: requestedCategory
    });

    res.status(200).send({
      listings: listingsWithCategory
    });
  }

  async allWithSearchQuery(req: Request, res: Response, next: NextFunction) {
    const query = req.params.searchQuery.replace('+', ' ').toLowerCase();
    const allListings: ListingsModel[] = await this.listingsRepository.find();

    const searchListings = allListings.filter(listing =>
      listing.title.toLowerCase().includes(query)
    );

    res.status(200).send({
      listings: searchListings
    });
  }

  async getListingDetails(req: Request, res: Response, next: NextFunction) {
    const listing = await this.listingsRepository.findOne(req.params.id);
    if (!listing) {
      res.status(404).send('listing not found');
      return;
    }

    const user = await getRepository(User).findOne(listing.user_id);
    if (!user) {
      res.status(404).send('error retrieving user');
      return;
    }

    
    const categry = await getRepository(Categories).findOne(listing.category);
    if (!categry) {
      res.status(404).send('error retrieving category');
      return;
    }

    res.status(200).send({
      message: 'success',
      listing: {...listing, username: user.username, categoryName: categry.name}
    });
  }
}
