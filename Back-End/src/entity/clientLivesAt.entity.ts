import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class ClientLivesAt {

    @PrimaryColumn()
    client_id: number;

    @PrimaryColumn()
    address_id: number;
}
