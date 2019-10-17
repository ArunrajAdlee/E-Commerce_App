import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/user.entity";
import {UserModel} from "../models/user.model"

export class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.findOne(req.params.id);
    }
}