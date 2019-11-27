import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street_name: string;

    @Column()
    street_number: number;

    @Column({nullable: true})
    unit_number: number;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    postal_code: string;

    @Column()
    country: string;
}
