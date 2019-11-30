import { NextFunction, Request, Response } from 'express';
import { Ads } from '../entity/ads.entity';
import { getRepository } from 'typeorm';

export class AdsController {
  private adsRepository = getRepository(Ads);

  async increaseClickCount(req: Request, res: Response, next: NextFunction) {
    try {
      await this.adsRepository
        .createQueryBuilder()
        .update('ads')
        .set({ click_count: () => 'click_count + 1' })
        .execute();

      res.status(200).send({
        message: 'click successful'
      });
    } catch (err) {
      res.status(404).send({
        message: 'an error occured'
      });
    }
  }

  async getClickCount(req: Request, res: Response, next: NextFunction) {
    const ad = await this.adsRepository.findOne(req.body.id);
    if (!ad) {
      res.status(404).send({
        message: 'an error occured'
      });
      return;
    }

    res.status(200).send({
      clickCount: ad.click_count
    });
  }
}
