import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Address} from "../entity/address.entity";
import {UserLivesAt} from "../entity/userLivesAt.entity";

export class AddressController {

    private addressRepository = getRepository(Address);
    private userLivesAtRepository = getRepository("UserLivesAt");

    async all(req: Request, res: Response, next: NextFunction) {
        const addresses = await this.addressRepository.find();
        res.status(200).send({
      		addresses: addresses
   		});
    }

    // Get all addresses of a user NOT DONE
    async allUserAddress(req: Request, res: Response, next: NextFunction) {
    	const userID: number = parseInt(req.params.id);
        const userAddressIDs = await this.userLivesAtRepository.query( //address_ids of a user
            "SELECT address_id AS id " +
            "FROM " + this.userLivesAtRepository.metadata.tableName + " " +
            "WHERE user_id = " + userID
        );
        const userAddresses = await this.addressRepository.findByIds(userAddressIDs);
        res.status(200).send({
	      addresses: userAddresses
	    });
    } 
}