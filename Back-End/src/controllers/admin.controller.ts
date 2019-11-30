import { NextFunction, Request, Response } from 'express';
import { Listings } from '../entity/listings.entity';
import { getRepository } from 'typeorm';
import { AuthModel } from '../models/auth.model';
// tslint:disable-next-line
const { checkAuth } = require('../helpers/check-auth');

export class AdminController {
    
  async listings(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    const listings = await getRepository(Listings)
      .createQueryBuilder('listings')
      .orderBy('listings.id', 'DESC')
      .getMany();

    res.status(200).send({
      listings: listings
    });
  }
}
