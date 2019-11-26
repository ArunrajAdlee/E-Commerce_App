import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Address} from "../entity/address.entity";

export class AddressController {
    private addressRepository = getRepository(Address);

    async all(req: Request, res: Response, next: NextFunction) {
        const addresses = await this.addressRepository.find();
        res.status(200).send({
      		addresses: addresses
   		});
    }
}