import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/user.entity";
import {UserModel} from "../models/user.model"
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import e = require("express");

export class AuthController {

    private userRepository = getRepository(User);

    async createUser(request: Request, response: Response, next: NextFunction) {

        //Validate info in the future *****
        const userExists = await this.userRepository.find({username: request.body.username});
        if (userExists) {
            response.status(404).send('user already exists');
            return;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const newUser: UserModel = {
            username: request.body.username,
            password: hashedPassword
        }


        //Add try/catch *****
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

    async login(request: Request, response: Response, next: NextFunction) {
        //Check if user exists
        const user = await this.userRepository.findOne({username: request.body.username});
        if (!user) {
            response.status(404).send('user does not exist');
            return;
        }

        //Validate password
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (!validPassword) {
            response.status(404).send('invalid password');
            return;
        }

        //Create and return token
        const token = jwt.sign({
            username: user.username,
            userId: user.id
        },
        'secretKey'
        );
        //May need more information like expiration time (ask front-end peeps) ****
        response.header('auth-token', token).send('sucessfully logged in'); 
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