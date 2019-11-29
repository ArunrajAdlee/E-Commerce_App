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
    const listings = await this.listingsRepository
      .createQueryBuilder('listings')
      .orderBy('listings.id', 'DESC')
      .getMany();

    res.status(200).send({
      listings: listings
    });
  }

  //Gets all active listings
  async getActive(req: Request, res: Response, next: NextFunction) {
    const activeListings = await this.listingsRepository
      .createQueryBuilder('listings')
      .where('listings.status = :status', { status: true })
      .orderBy('listings.id', 'DESC')
      .getMany();

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

      const user = await getRepository(User).findOne(authenticatedUser.id);
      if (!user) {
        res.status(404).send('error retrieving user');
        return;
      }

      const categoryId = req.body.category ? req.body.category : 4;
      let category = await getRepository(Categories).findOne(categoryId);
      if (!category) {
        res.status(404).send('error retrieving category');
        return;
      }

      const newProduct: ListingsModel = {
        user_id: user.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock_count: req.body.stock_count,
        category: categoryId,
        image: imageURL,
        thumbnail: thumbnailURL,
        status: true,
        username: user.username,
        category_name: category.name
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
    const listingsWithCategory = await this.listingsRepository
      .createQueryBuilder('listings')
      .where('listings.category = :category', { category: requestedCategory })
      .orderBy('listings.id', 'DESC')
      .getMany();

    res.status(200).send({
      listings: listingsWithCategory
    });
  }

  async allWithSearchQuery(req: Request, res: Response, next: NextFunction) {
    const query = req.params.searchQuery.replace('+', ' ').toLowerCase();
    const listingsWithSearchQuery = await this.listingsRepository
      .createQueryBuilder('listings')
      .where('listings.title like :query', { query: '%' + query + '%' })
      .orderBy('listings.id', 'DESC')
      .getMany();

    res.status(200).send({
      listings: listingsWithSearchQuery
    });
  }

  async getListingDetails(req: Request, res: Response, next: NextFunction) {
    const listing = await this.listingsRepository.findOne(req.params.id);
    if (!listing) {
      res.status(404).send('listing not found');
      return;
    }

    res.status(200).send({
      message: 'success',
      listing: listing 
    });
  }
}
