import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Address} from "../entity/address.entity";
import {AddressModel} from "../models/address.model";

export class AddressController {

    private addressRepository = getRepository(Address);

    async save(req: Request, res: Response, next: NextFunction) {
        const newAddress: AddressModel = {
               street_name: req.body.streetName,
               street_number: req.body.streetNumber,
               unit_number: req.body.unitNumber,
               city: req.body.city,
               province: req.body.province,
               postal_code: req.body.postalCode,
               country: req.body.country
        }

        const address = await this.addressRepository.save(newAddress);
        if(!address) {
            res.status(404).send("error creating address");
        }

        res.status(200).send({
            address: address
        });
    } 
}