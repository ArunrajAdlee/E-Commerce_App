import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';;
import { ReviewsModel } from '../models/reviews.model';
import { Reviews } from '../entity/reviews.entity';

export class ReviewsController {

    private reviewsRepository = getRepository(Reviews);

    async saveReviews(req: Request, res: Response, next: NextFunction) {  

    const newReview: ReviewsModel =  {  
        title: req.body.title,
        seller_id: req.body.seller_id,
        user_id: req.body.user_id,
        description: req.body.description,
        rating: req.body.rating

    };

        try { 
             const savedReviews = await this.reviewsRepository.save(newReview);
             if (savedReviews) {
                 res.status(200).send({
                     message: 'sucessfully saved review',
                     savedReviews
                 });
                 return;
             }

             res.status(404).send({message: 'failed to save'});
            }   catch (error) {
                    res.status(404).send({message: 'failed to save'});
                }
            }
        }
    