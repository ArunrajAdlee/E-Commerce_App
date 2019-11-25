import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class UserLivesAt {

    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    address_id: number;
}
