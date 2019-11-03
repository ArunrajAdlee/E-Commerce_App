import bcrypt = require('bcryptjs');
import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
const { checkAuth } = require('../helpers/check-auth');

export class AuthController {
  private userRepository = getRepository(User);
  private cookieName = 'access_token';

  async createUser(req: Request, res: Response, next: NextFunction) {
    // Validate info in the future *****
    const userExists = await this.userRepository.findOne({
      username: req.body.username
    });
    if (userExists) {
      res.status(404).send('user already exists');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser: UserModel = {
      username: req.body.username,
      password: hashedPassword
    };

    // Save new user to the database
    try {
      const savedUser = await this.userRepository.save(newUser);
      res.status(200).send({
        message: 'sucessfully created the user',
        savedUser
      });
    } catch (error) {
      res.status(404).send('could not create account');
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    // Check if user exists
    const userData = await this.userRepository.findOne({
      username: req.body.username
    });
    if (!userData) {
      res.status(404).send('user does not exist');
      return;
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(404).send('invalid password');
      return;
    }

    // Create and return token
    const token = jwt.sign(
      {
        username: userData.username,
        id: userData.id
      },
      'secretKey'
    );

    //Create and return essential user data
    const user = {
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      brand_name: userData.brand_name
    };

    // May need more information like expiration time (ask front-end peeps) ****
    res
      .cookie(this.cookieName, token, {
        maxAge: 3600000,
        httpOnly: true
        // uncomment 'secure' when running in production
        // secure: true
      })
      .send({ message: 'cookie-set', user });
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    // Find user to delete
    const userToRemove = await this.userRepository.findOne(req.params.id);
    if (!userToRemove) {
      res.status(404).send('error');
      return;
    }

    // Find user to delete
    const removedUser = await this.userRepository.remove(userToRemove);
    if (!removedUser) {
      res.status(404).send('error');
    } else {
      res.status(200).send('successfully deleted');
    }
  }

  async getAuthStatus(req: Request, res: Response, next: NextFunction) {
    let isAuthenticated = false;
    let user: any;
    //Check if the user is authenticated
    const authenticatedUser: AuthModel = checkAuth(req);

    //If authenticated, retrieve user data
    if (authenticatedUser) {
      isAuthenticated = true;
      const userDatabase = await this.userRepository.findOne({
        id: authenticatedUser.id
      });

      //Set user data
      if (userDatabase) {
        user = {
          username: userDatabase.username,
          email: userDatabase.email,
          first_name: userDatabase.first_name,
          last_name: userDatabase.last_name,
          brand_name: userDatabase.brand_name
        };
      }
    }
    //Return authentication status and user data
    res.status(200).send({ isAuthenticated, user });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (authenticatedUser) {
      res.clearCookie(this.cookieName);
    }
    res.status(200).end();
  }
}
