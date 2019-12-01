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
        };

        //Check if identical address is already in db
        const existingAddress = await this.addressRepository
          .createQueryBuilder("Address")
          .select( //Makes sure fields returned have same names
            "street_name AS street_name, " +
            "street_number AS street_number, " +
            "unit_number AS unit_number, " +
            "city AS city, " +
            "province AS province, " +
            "postal_code AS postal_code, " +
            "country AS country, " +
            "id as id")
          .where(
            "LOWER(street_name) = LOWER(:streetAddress) AND " + 
            "street_number = :streetNumber AND " +
            "unit_number = :unitNumber AND " +
            "LOWER(city) = LOWER(:city) AND " + 
            "LOWER(province) = LOWER(:province) AND " +
            "REPLACE(LOWER(postal_code), ' ', '') = REPLACE(LOWER(:postalCode), ' ', '') AND " +
            "LOWER(country) = LOWER(:country)", 
            { streetAddress: newAddress.street_name, 
              streetNumber: newAddress.street_number, 
              unitNumber: newAddress.unit_number,
              city: newAddress.city,
              province: newAddress.province,
              postalCode: newAddress.postal_code,
              country: newAddress.country})
          .getRawOne();

        let address;
        if(!existingAddress) {
            address = await this.addressRepository.save(newAddress);
        }
        else {
            address = existingAddress;
        }

        res.status(200).send({
            address: address,
            created: !existingAddress
        });
    } 
}