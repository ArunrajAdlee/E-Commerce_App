import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import { Address } from "../entity/address.entity";
import { AuthModel } from "../models/auth.model";
const { checkAuth } = require("../helpers/check-auth");
import bcrypt = require("bcryptjs");

export class UserController {
  private userRepository = getRepository(User);
  private addressRepository = getRepository(Address);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id);
  }

  async editUserInfo(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send("user is not authenticated");
      return;
    }

    try {
      //update the following fields based on the userID-------
      this.userRepository
        .createQueryBuilder("User")
        .update("User")
        .set({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone_number: req.body.phone_number
        })
        .where("id = :id", { id: authenticatedUser.id })
        .execute();
    } catch (e) {
      res.status(404).send({
        message: "an error occured updating user"
      });
      return;
    }

    const user = await this.userRepository.findOne(authenticatedUser.id); //store user info in a variable------
    if (!user) {
      res.status(404).send({
        message: "an error occurred"
      });
      return;
    }

    try {
      //update the following fields based on the address ID associated to the user---------
      this.addressRepository
        .createQueryBuilder("Address")
        .update("Address")
        .set({
          street_name: req.body.street_name,
          street_number: req.body.street_number,
          city: req.body.city,
          province: req.body.province,
          country: req.body.country,
          unit_number: req.body.unit_number,
          postal_code: req.body.postal_code
        })
        .where("id = :id", { id: user.address_id })
        .execute();
    } catch (e) {
      res.status(404).send({
        message: "an error occured updating address"
      });
      return;
    }

    const address = await this.addressRepository.findOne(user.address_id);
    if (!address) {
      res.status(404).send({
        message: "error"
      });
      return;
    }

    res.status(200).send({
      user: user,
      address: address
    });
  }
}
