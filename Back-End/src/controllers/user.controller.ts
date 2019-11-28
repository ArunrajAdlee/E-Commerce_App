import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import {Address} from "../entity/address.entity";
import {AuthModel} from "../models/auth.model";
const { checkAuth } = require('../helpers/check-auth');
import bcrypt = require('bcryptjs');


export class UserController {
  private userRepository = getRepository(User);
  private addressRepository = getRepository(Address)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id);
  }

  async EditUserInfo(req: Request, res: Response, next: NextFunction){
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //update the following fields based on the userID-------
    this.userRepository.createQueryBuilder('User').update('User')
        .set({ first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,phone_number:req.body.phone_number,password:hashedPassword})
        .where("id = :id", { id: authenticatedUser.id })
        .execute();


    const user = await this.userRepository.findOne(req.params.id); //store user info in a variable------
    if (!user) {
      res.status(404).send({
        message: 'an error occured'
      })
    }
    //update the following fields based on the address ID associated to the user---------
    this.addressRepository.createQueryBuilder('Address').update('Address')
        .set({ street_name:"sample",street_number:5,city:"quebec",province:"canada",country:"brazil"})
        .where("id = :id", { id: user.address})
        .execute();


    const address = await this.addressRepository.findOne(user.address);
    if (!address) {
      res.status(404).send({
        message: 'error'
      })
    }


  res.status(200).send({
    user: user,
    address: address
  });

  }
}
