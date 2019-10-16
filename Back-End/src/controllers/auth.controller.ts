import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/user.entity";
import {UserModel} from "../models/user.model"
import e = require("express");

export class AuthController {

    private userRepository = getRepository(User);

    async createUser(request: Request, response: Response, next: NextFunction) {
        const newUser: UserModel = {
            username: request.body.username,
            password: request.body.password
        }

        const savedUser = await this.userRepository.save(newUser);
        if (!savedUser) {
            response.status(404).send('could not create account');
            return;
        } else {
            response.status(200).send({
                message: 'sucessfully created the user',
                savedUser
            });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //Find user to delete
        const userToRemove = await this.userRepository.findOne(request.params.id);
        if (!userToRemove) { 
             response.status(404).send('error');
             return;
        } 

        //Find user to delete
        const removedUser = await this.userRepository.remove(userToRemove);
        if (!removedUser) {
            response.status(404).send('error');
        } else {
            response.status(200).send('successfully deleted');
        }

    }

}