import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Address} from "../entity/address.entity";
import {ClientLivesAt} from "../entity/clientLivesAt.entity";

export class AddressController {

    private addressRepository = getRepository(Address);
    private clientLivesAtRepository = getRepository(ClientLivesAt);

    async all(req: Request, res: Response, next: NextFunction) {
        const addresses = await this.addressRepository.find();
        res.status(200).send({
      		addresses: addresses
   		});
    }

    // Get all addresses of a user/client NOT DONE
    async allUserAddress(req: Request, res: Response, next: NextFunction) {
    	const userID: number = parseInt(req.params.id);
    	/*const userAddressIDs = await this.clientLivesAtRepository.query(
    		"SELECT address_id AS id " +
    		  "FROM address " +
    		 "WHERE client_id = userID"
    	); // TODO: Create/Populate ClientLivesAtTable*/
        const addressIDs = await this.addressRepository.find({ select: ["id"] }); //TODO: TEMP --> Not needed once ClientLivesAt is created/populated
        const userAddresses = await this.addressRepository.findByIds(addressIDs); //TODO: TEMP --> addressIDs supposed to be userAddressIDs
	    res.status(200).send({
	      addresses: userAddresses
	    });
    } 
}