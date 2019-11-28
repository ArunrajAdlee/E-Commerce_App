import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';

export class UserController {
  private userRepository = getRepository(User);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id);
  }

  async EditUserInfo(req: Request, res: Response, next: NextFunction){
    this.userRepository.createQueryBuilder('User').update('User')
        .set({ username:"sample"})
        .where("id = :id", { id: req.params.id })
        .execute();

    return this.userRepository.findOne(req.params.id);

  }
}
