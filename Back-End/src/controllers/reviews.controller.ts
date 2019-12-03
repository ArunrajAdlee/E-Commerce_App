import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ReviewsModel } from '../models/reviews.model';
import { Reviews } from '../entity/reviews.entity';
import { AuthModel } from '../models/auth.model';
const { checkAuth } = require('../helpers/check-auth');

export class ReviewsController {
  private reviewsRepository = getRepository(Reviews);

  async saveReviews(req: Request, res: Response, next: NextFunction) {

    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

console.log(req.body.listing_id);

    const newReview: ReviewsModel = {
      title: req.body.title,
      seller_id: req.body.seller_id,
      user_id: authenticatedUser.id,
      description: req.body.description,
      rating: req.body.rating
    };

    try {
      const savedReviews = await this.reviewsRepository.save(newReview);
      if (savedReviews) {
        res.status(200).send({
          message: 'sucessfully saved review',
          reviews: savedReviews
        });
        return;
      }
    } catch (error) {
      res.status(404).send({ message: 'failed to save' });
    }
  }

  async getReviews(req: Request, res: Response, next: NextFunction) {
    const reviewsWithSellerId = await this.reviewsRepository
      .createQueryBuilder('reviews')
      .where('reviews.seller_id = :seller_id', {
        seller_id: req.params.seller_id
      })
      .orderBy('reviews.id', 'DESC')
      .getMany();

    res.status(200).send({
      reviews: reviewsWithSellerId
    });
  }
}
