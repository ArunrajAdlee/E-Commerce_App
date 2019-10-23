import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Categories} from "../entity/categories.entity";

export class CategoriesController {

    private categoriesRepository = getRepository(Categories);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.categoriesRepository.find();
    }
}